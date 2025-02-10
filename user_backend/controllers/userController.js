const User = require("../models/User");
const ContactMessage = require("../models/ContactMessages");
const jwt = require("jsonwebtoken");

// Generate JWT Token
require("dotenv").config(); 
const generateToken = (userId) => {
  const payload = { userId };
  
  // Use the secret key from the environment variable
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password ,role} = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password,role });

    // Save user to MongoDB
    await user.save();
    console.log("User successfully inserted!");

    // Send success response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use deleteOne() instead of remove()
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "User removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("_id name email");

    // Get student emails
    const studentEmails = students.map(student => student.email);

    // Fetch the latest feedback message for each student
    const feedbacks = await ContactMessage.aggregate([
      { $match: { email: { $in: studentEmails } } },
      { $sort: { created_at: -1 } }, 
      {
        $group: {
          _id: "$email",
          message: { $first: "$message" },
          created_at: { $first: "$created_at" } 
        }
      }
    ]);

    // Convert feedbacks array to an object for easy lookup
    const feedbackMap = {};
    feedbacks.forEach(fb => {
      feedbackMap[fb._id] = { message: fb.message, created_at: fb.created_at };
    });

    // Merge student data with their feedback message
    const response = students.map(student => ({
      _id: student._id.toString(), 
      name: student.name,
      email: student.email,
      message: feedbackMap[student.email]?.message || "No feedback"
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

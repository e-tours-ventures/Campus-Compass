const express = require("express");
const { registerUser, loginUser, getAllUsers, deleteUser, getAllStudents } = require("../controllers/userController");

const router = express.Router();

// Register a new user
router.post("/users/register", registerUser);  // Ensuring the API path starts with /users

// User login
router.post("/users/login", loginUser);

// Get all users (for admin or other purposes)
router.get("/users", getAllUsers);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

router.get("/users/getStudentDetails", getAllStudents);

module.exports = router;

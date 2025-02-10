const express = require("express");
const { registerUser, loginUser, getAllUsers, deleteUser, getAllStudents } = require("../controllers/userController");

const router = express.Router();

// Register a new user
router.post("/users/register", registerUser);  

// User login
router.post("/users/login", loginUser);

// Get all users (for admin or other purposes)
router.get("/users", getAllUsers);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

//Get all students
router.get("/users/getStudentDetails", getAllStudents);

module.exports = router;

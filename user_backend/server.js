const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend access
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use routes with /api prefix
app.use("/api", userRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing. Please set MONGO_URI in .env");
  process.exit(1); // Exit the app if no database URI is found
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  // Start server only after DB connection
  app.listen(3001, () => {
    console.log("🚀 Server running on port 3001");
  });
})
.catch((error) => {
  console.error("❌ Error connecting to MongoDB:", error);
});

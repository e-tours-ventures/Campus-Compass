const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/userRoutes");

// Use routes with /api prefix
app.use("/api", userRoutes);  // This matches the frontend's expected `/api/users/register`

app.use(cors({ origin: "http://localhost:3000" }));
// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


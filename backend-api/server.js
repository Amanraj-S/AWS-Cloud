const express = require("express");
const cors = require("cors");
const os = require("os");
require("dotenv").config();

const app = express();

// ------------------------------
// Middleware
// ------------------------------
app.use(cors());
app.use(express.json());

// ------------------------------
// Health Check Route (Crucial for AWS ALB!)
// ------------------------------
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Optional root route
app.get("/", (req, res) => {
  res.status(200).send("AWS MERN Backend Running");
});

// ------------------------------
// Main API Route
// ------------------------------
app.get("/api", (req, res) => {
  try {
    // Grab the name of the AWS EC2 instance (or local PC name)
    const serverName = os.hostname();

    // Instantly respond without waiting for a database
    res.status(200).json({
      success: true,
      message: "Response from AWS Server",
      server: serverName,
      time: new Date()
    });

  } catch (error) {
    console.error("API Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// ------------------------------
// Start Server
// ------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server hostname: ${os.hostname()}`);
});
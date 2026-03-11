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
// Utility Function: Get Private IP
// ------------------------------
function getPrivateIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }

  return "Unknown";
}

// ------------------------------
// Health Check Route (Important for ALB)
// ------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    server: os.hostname()
  });
});

// ------------------------------
// Root Route
// ------------------------------
app.get("/", (req, res) => {
  res.status(200).send("AWS MERN Backend Running 🚀");
});

// ------------------------------
// Main API Route
// ------------------------------
app.get("/api", (req, res) => {
  try {

    const hostname = os.hostname();
    const privateIP = getPrivateIP();

    res.status(200).json({
      success: true,
      message: "Response from AWS Server",
      server: hostname,
      privateIP: privateIP,
      platform: os.platform(),
      uptimeSeconds: os.uptime(),
      time: new Date().toISOString()
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
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🖥 Hostname: ${os.hostname()}`);
  console.log(`📡 Private IP: ${getPrivateIP()}`);
  console.log("=================================");
});
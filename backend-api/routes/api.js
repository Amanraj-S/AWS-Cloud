const express = require("express")
const os = require("os")

const router = express.Router()

router.get("/", (req, res) => {
  try {

    // Hostname of EC2 instance
    const hostname = os.hostname()

    // Network interfaces (to extract private IP)
    const networkInterfaces = os.networkInterfaces()

    let privateIP = "Unknown"

    for (const iface of Object.values(networkInterfaces)) {
      for (const net of iface) {
        if (net.family === "IPv4" && !net.internal) {
          privateIP = net.address
          break
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Response from AWS Server",
      server: hostname,
      privateIP: privateIP,
      platform: os.platform(),
      uptime: os.uptime(),
      time: new Date().toISOString()
    })

  } catch (error) {

    console.error("API Error:", error)

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    })
  }
})

module.exports = router
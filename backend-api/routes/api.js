const express = require("express")
const os = require("os")

const router = express.Router()

router.get("/", (req, res) => {
  try {
    // Grab the name of the AWS EC2 instance (or your local PC name)
    const serverName = os.hostname()

    // Instantly send the response back to the React frontend
    res.status(200).json({
      success: true,
      message: "200 OK", 
      server: serverName,
      time: new Date()
    })

  } catch (error) {
    console.error("API Error:", error)

    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
})

module.exports = router
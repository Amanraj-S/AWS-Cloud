const express = require("express")
const os = require("os")

const RequestLog = require("../models/RequestLog")

const router = express.Router()

router.get("/", async (req, res) => {

  try {

    const serverName = os.hostname()

    // Save request log in MongoDB
    await RequestLog.create({
      server: serverName,
      time: new Date()
    })

    // Count total requests
    const totalRequests = await RequestLog.countDocuments()

    res.status(200).json({

      success: true,
      message: "Response from AWS Server",
      server: serverName,
      time: new Date(),
      totalRequests: totalRequests

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
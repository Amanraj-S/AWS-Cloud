const express = require("express")
const cors = require("cors")
const os = require("os")
require("dotenv").config()

const connectDB = require("./config/db")
const RequestLog = require("./models/RequestLog")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Health check route (useful for AWS ALB)
app.get("/", (req, res) => {
  res.send("AWS MERN Backend Running")
})

// Main API
app.get("/api", async (req, res) => {

  try {

    const serverName = os.hostname()

    // Save request log
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
      message: "Internal Server Error"
    })

  }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
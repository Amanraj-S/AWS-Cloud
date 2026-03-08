const mongoose = require("mongoose")

const RequestLogSchema = new mongoose.Schema(
  {
    server: {
      type: String,
      required: true
    },

    time: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("RequestLog", RequestLogSchema)
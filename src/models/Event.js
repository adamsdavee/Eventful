const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
   {
      creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      title: {
         type: String,
         required: true,
      },

      description: {
         type: String,
         required: true,
      },

      location: {
         type: String,
         required: true,
      },

      date: {
         type: Date,
         required: true,
      },

      ticketPrice: {
         type: Number,
         required: true,
      },

      maximumAttendees: {
         type: Number,
         required: true,
      },

      reminderDaysBeforeEvent: {
         type: Number,
         default: 1,
      },
   },
   {
      timestamps: true,
   },
)

module.exports = mongoose.model("Event", eventSchema)

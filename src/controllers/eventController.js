const Event = require("../models/Event")
const Ticket = require("../models/Ticket")
const generateShareLinks = require("../utils/shareLinks")

exports.createEvent = async (req, res) => {
   try {
      const event = await Event.create({
         ...req.body,
         creator: req.user._id,
      })

      res.status(201).json(event)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.getMyEvents = async (req, res) => {
   try {
      const events = await Event.find({
         creator: req.user._id,
      })

      res.json(events)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.getAllEvents = async (req, res) => {
   try {
      const events = await Event.find()
         .populate("creator", "fullName email")
         .sort({ createdAt: -1 })

      res.json(events)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.getSingleEvent = async (req, res) => {
   try {
      const event = await Event.findById(req.params.id).populate(
         "creator",
         "fullName",
      )

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      res.json({
         event,
         shareLinks: generateShareLinks(event._id),
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.updateEvent = async (req, res) => {
   try {
      const event = await Event.findById(req.params.id)

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      if (event.creator.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            message: "Not authorized",
         })
      }

      const updatedEvent = await Event.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
         },
      )

      res.json(updatedEvent)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.deleteEvent = async (req, res) => {
   try {
      const event = await Event.findById(req.params.id)

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      if (event.creator.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            message: "Not authorized",
         })
      }

      await event.deleteOne()

      res.json({
         message: "Event deleted successfully",
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.getEventAttendees = async (req, res) => {
   try {
      const event = await Event.findById(req.params.eventId)

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      if (event.creator.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            message: "Not authorized",
         })
      }

      const attendees = await Ticket.find({
         event: event._id,
      })
         .populate("user", "fullName email")
         .select("user")

      res.json(attendees)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

const Ticket = require("../models/Ticket")
const Event = require("../models/Event")

exports.getMyTickets = async (req, res) => {
   try {
      const tickets = await Ticket.find({
         user: req.user._id,
      })
         .populate("event")
         .sort({ createdAt: -1 })

      res.json(tickets)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.verifyTicket = async (req, res) => {
   try {
      const { ticketId } = req.body

      const ticket = await Ticket.findById(ticketId).populate("event")

      if (!ticket) {
         return res.status(404).json({
            valid: false,
            message: "Ticket not found",
         })
      }

      if (ticket.event.creator.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            valid: false,
            message: "Not authorized",
         })
      }

      if (ticket.status === "used") {
         return res.status(400).json({
            valid: false,
            message: "Ticket already used",
         })
      }

      res.json({
         valid: true,
         ticket,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.checkInTicket = async (req, res) => {
   try {
      const { ticketId } = req.body

      const ticket = await Ticket.findById(ticketId).populate("event")

      if (!ticket) {
         return res.status(404).json({
            message: "Ticket not found",
         })
      }

      if (ticket.event.creator.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            message: "Not authorized",
         })
      }

      if (ticket.status === "used") {
         return res.status(400).json({
            message: "Ticket already used",
         })
      }

      ticket.status = "used"

      ticket.checkedInAt = new Date()

      await ticket.save()

      res.json({
         message: "Check-in successful",
         ticket,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

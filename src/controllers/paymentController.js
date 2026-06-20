const Event = require("../models/Event")
const Ticket = require("../models/Ticket")
const paystack = require("../utils/paystack")
const generateQRCode = require("../utils/qrGenerator")

exports.initializePayment = async (req, res) => {
   try {
      const { eventId } = req.body

      const event = await Event.findById(eventId)

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      // Prevent duplicate ticket purchase
      const existingTicket = await Ticket.findOne({
         event: eventId,
         user: req.user._id,
      })

      if (existingTicket) {
         return res.status(400).json({
            message: "You already purchased a ticket",
         })
      }

      const response = await paystack.post("/transaction/initialize", {
         email: req.user.email,
         amount: event.ticketPrice * 100, // kobo
         callback_url: "http://localhost:5000/api/payments/verify",
         metadata: {
            eventId,
            userId: req.user._id,
         },
      })

      res.json(response.data.data)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.verifyPayment = async (req, res) => {
   try {
      const { reference } = req.body

      const response = await paystack.get(`/transaction/verify/${reference}`)

      const data = response.data.data

      if (data.status !== "success") {
         return res.status(400).json({
            message: "Payment not successful",
         })
      }

      const { eventId, userId } = data.metadata

      const event = await Event.findById(eventId)

      if (!event) {
         return res.status(404).json({
            message: "Event not found",
         })
      }

      const soldTickets = await Ticket.countDocuments({
         event: eventId,
      })

      if (soldTickets >= event.maximumAttendees) {
         return res.status(400).json({
            message: "Event is sold out",
         })
      }

      const qrData = {
         eventId,
         userId,
         reference,
      }

      const qrCode = await generateQRCode(qrData)

      const existingTicket = await Ticket.findOne({
         paymentReference: reference,
      })

      if (existingTicket) {
         return res.status(400).json({
            message: "Ticket already exists for this payment",
         })
      }

      const ticket = await Ticket.create({
         event: eventId,
         user: userId,
         paymentReference: reference,
         amountPaid: event.ticketPrice,
         qrCode,
         status: "valid",
      })

      res.json({
         message: "Ticket created successfully",
         ticket,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

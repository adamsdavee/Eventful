const Event = require("../models/Event")
const Ticket = require("../models/Ticket")

exports.dashboard = async (req, res) => {
   try {
      const creatorId = req.user._id

      const creatorEvents = await Event.find({
         creator: creatorId,
      }).select("_id")

      const eventIds = creatorEvents.map((event) => event._id)

      const totalEvents = creatorEvents.length

      const totalTicketsSold = await Ticket.countDocuments({
         event: { $in: eventIds },
      })

      const totalCheckIns = await Ticket.countDocuments({
         event: { $in: eventIds },
         status: "used",
      })

      res.json({
         totalEvents,
         totalTicketsSold,
         totalCheckIns,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.eventAnalytics = async (req, res) => {
   try {
      const { eventId } = req.params

      const event = await Event.findById(eventId)

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

      const ticketsSold = await Ticket.countDocuments({
         event: eventId,
      })

      const checkedIn = await Ticket.countDocuments({
         event: eventId,
         status: "used",
      })

      const revenue = ticketsSold * event.ticketPrice

      res.json({
         event: {
            id: event._id,
            title: event.title,
         },
         ticketsSold,
         checkedIn,
         revenue,
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.myEventAnalytics = async (req, res) => {
   try {
      const events = await Event.find({
         creator: req.user._id,
      })

      const analytics = await Promise.all(
         events.map(async (event) => {
            const ticketsSold = await Ticket.countDocuments({
               event: event._id,
            })

            const checkedIn = await Ticket.countDocuments({
               event: event._id,
               status: "used",
            })

            return {
               eventId: event._id,
               title: event.title,
               ticketsSold,
               checkedIn,
               revenue: ticketsSold * event.ticketPrice,
            }
         }),
      )

      res.json(analytics)
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

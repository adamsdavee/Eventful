const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

const {
   createEvent,
   getMyEvents,
   getAllEvents,
   getSingleEvent,
   updateEvent,
   deleteEvent,
   getEventAttendees,
} = require("../controllers/eventController")

router.get("/", getAllEvents)

router.get("/my-events", authMiddleware, roleMiddleware("creator"), getMyEvents)

router.get(
   "/:eventId/attendees",
   authMiddleware,
   roleMiddleware("creator"),
   getEventAttendees,
)

router.post("/", authMiddleware, roleMiddleware("creator"), createEvent)

router.put("/:id", authMiddleware, roleMiddleware("creator"), updateEvent)

router.delete("/:id", authMiddleware, roleMiddleware("creator"), deleteEvent)

router.get("/:id", getSingleEvent)

module.exports = router

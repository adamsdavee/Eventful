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

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Events list
 */

router.get("/", getAllEvents)

router.get("/my-events", authMiddleware, roleMiddleware("creator"), getMyEvents)

router.get(
   "/:eventId/attendees",
   authMiddleware,
   roleMiddleware("creator"),
   getEventAttendees,
)

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create event
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Event created
 */

router.post("/", authMiddleware, roleMiddleware("creator"), createEvent)

router.put("/:id", authMiddleware, roleMiddleware("creator"), updateEvent)

router.delete("/:id", authMiddleware, roleMiddleware("creator"), deleteEvent)

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event details
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */

router.get("/:id", getSingleEvent)

module.exports = router

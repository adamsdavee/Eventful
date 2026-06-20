const express = require("express")

const router = express.Router()

const {
   getMyTickets,
   verifyTicket,
   checkInTicket,
} = require("../controllers/ticketController")

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

/**
 * @swagger
 * /api/tickets/my-tickets:
 *   get:
 *     summary: Get purchased tickets
 *     tags:
 *       - Tickets
 */

router.get(
   "/my-tickets",
   authMiddleware,
   roleMiddleware("eventee"),
   getMyTickets,
)

/**
 * @swagger
 * /api/tickets/verify:
 *   post:
 *     summary: Verify ticket validity
 *     tags:
 *       - Tickets
 */

router.post("/verify", authMiddleware, roleMiddleware("creator"), verifyTicket)

/**
 * @swagger
 * /api/tickets/check-in:
 *   post:
 *     summary: Check in attendee
 *     tags:
 *       - Tickets
 */

router.post(
   "/check-in",
   authMiddleware,
   roleMiddleware("creator"),
   checkInTicket,
)

module.exports = router

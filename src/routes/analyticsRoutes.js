const express = require("express")

const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

const {
   dashboard,
   eventAnalytics,
   myEventAnalytics,
} = require("../controllers/analyticsController")

/**
 * @swagger
 * /api/analytics/dashboard:
 *   get:
 *     summary: Creator dashboard analytics
 *     tags:
 *       - Analytics
 */

router.get("/dashboard", authMiddleware, roleMiddleware("creator"), dashboard)

/**
 * @swagger
 * /api/analytics/events:
 *   get:
 *     summary: Analytics for all creator events
 *     tags:
 *       - Analytics
 */

router.get(
   "/events",
   authMiddleware,
   roleMiddleware("creator"),
   myEventAnalytics,
)

/**
 * @swagger
 * /api/analytics/event/{eventId}:
 *   get:
 *     summary: Event analytics
 *     tags:
 *       - Analytics
 */
router.get(
   "/event/:eventId",
   authMiddleware,
   roleMiddleware("creator"),
   eventAnalytics,
)

module.exports = router

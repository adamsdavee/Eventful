const express = require("express")

const router = express.Router()

const {
   initializePayment,
   verifyPayment,
} = require("../controllers/paymentController")

const authMiddleware = require("../middleware/authMiddleware")

/**
 * @swagger
 * /api/payments/initialize:
 *   post:
 *     summary: Initialize Paystack payment
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 */

router.post("/initialize", authMiddleware, initializePayment)

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Paystack payment
 *     tags:
 *       - Payments
 */

router.post("/verify", verifyPayment)

module.exports = router

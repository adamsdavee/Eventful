const express = require("express")

const router = express.Router()

const { register, login } = require("../controllers/authController")

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - creator
 *                   - eventee
 *     responses:
 *       201:
 *         description: User created
 */

router.post("/register", register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post("/login", login)

module.exports = router

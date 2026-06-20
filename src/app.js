const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const eventRoutes = require("./routes/eventRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const ticketRoutes = require("./routes/ticketRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")

const { swaggerUi, specs } = require("./swagger/swagger")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.get("/", (req, res) => {
   res.json({
      message: "Eventful API Running",
   })
})

app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/tickets", ticketRoutes)
app.use("/api/analytics", analyticsRoutes)

module.exports = app

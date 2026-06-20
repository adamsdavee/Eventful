const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
   res.json({
      message: "Eventful API Running",
   })
})

////// TESTS
const authMiddleware = require("./middleware/authMiddleware")

app.get("/api/profile", authMiddleware, (req, res) => {
   res.json(req.user)
})

////////

app.use("/api/auth", authRoutes)

module.exports = app

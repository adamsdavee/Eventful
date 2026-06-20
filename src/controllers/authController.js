const bcrypt = require("bcrypt")

const User = require("../models/User")
const generateToken = require("../utils/generateToken")

exports.register = async (req, res) => {
   try {
      const { fullName, email, password, role } = req.body

      if (!fullName || !email || !password || !role) {
         return res.status(400).json({
            message: "All fields are required",
         })
      }

      const existingUser = await User.findOne({ email })

      if (existingUser) {
         return res.status(400).json({
            message: "User already exists",
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
         fullName,
         email,
         password: hashedPassword,
         role,
      })

      const token = generateToken(user)

      res.status(201).json({
         message: "Registration successful",
         token,
         user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
         },
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
         return res.status(400).json({
            message: "Invalid credentials",
         })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid credentials",
         })
      }

      const token = generateToken(user)

      res.json({
         message: "Login successful",
         token,
         user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
         },
      })
   } catch (error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

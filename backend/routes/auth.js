const express  = require('express')
const jwt      = require('jsonwebtoken')
const User     = require('../models/User')
const { protect } = require('../middleware/auth')

const router = express.Router()

// ── HELPER: GENERATE JWT TOKEN ──
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' } // token valid for 30 days
  )
}

// ── REGISTER ──
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // check if all fields provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email and password'
      })
    }

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'An account with this email already exists'
      })
    }

    // create new user
    // password gets hashed automatically by the pre-save hook
    const user = await User.create({ name, email, password })

    // return user data + token
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── LOGIN ──
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      })
    }

    // find user by email
    // +password because we set select:false on password field
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // compare entered password with hashed password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // return user data + token
    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── GET CURRENT USER ──
// GET /api/auth/me
// protected route — requires valid token
router.get('/me', protect, async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user._id)
    res.json({
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      role:       user.role,
      favourites: user.favourites,
      createdAt:  user.createdAt,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
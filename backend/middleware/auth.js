const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// ── PROTECT ROUTE MIDDLEWARE ──
// add this to any route that requires login
// usage: router.get('/profile', protect, getProfile)
const protect = async (req, res, next) => {
  let token

  // check if token exists in Authorization header
  // format: "Bearer eyJhbGciOiJIUzI1NiJ9..."
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized — no token provided'
    })
  }

  try {
    // verify token using our secret key
    // this throws an error if token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // attach the user to the request object
    // so any route after this can access req.user
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next() // move to the actual route handler

  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized — invalid token'
    })
  }
}

// ── ADMIN ONLY MIDDLEWARE ──
// use AFTER protect middleware
// usage: router.delete('/:id', protect, adminOnly, deleteDestination)
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      message: 'Access denied — admin only'
    })
  }
}

module.exports = { protect, adminOnly }
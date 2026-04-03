const express = require('express')
const User    = require('../models/User')
const { protect } = require('../middleware/auth')

const router = express.Router()

// ── GET USER FAVOURITES ──
// GET /api/users/favourites
router.get('/favourites', protect, async (req, res) => {
  try {
    const user = await User
      .findById(req.user._id)
      .populate('favourites') // fetch full destination objects

    res.json(user.favourites)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── TOGGLE FAVOURITE ──
// POST /api/users/favourites/:destinationId
// adds if not saved, removes if already saved
router.post('/favourites/:destinationId', protect, async (req, res) => {
  try {
    const user    = await User.findById(req.user._id)
    const destId  = req.params.destinationId

    // check if already in favourites
    const isSaved = user.favourites.includes(destId)

    if (isSaved) {
      // remove from favourites
      user.favourites = user.favourites.filter(
        (id) => id.toString() !== destId
      )
    } else {
      // add to favourites
      user.favourites.push(destId)
    }

    await user.save()

    res.json({
      favourites: user.favourites,
      message:    isSaved ? 'Removed from favourites' : 'Added to favourites',
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── UPDATE PROFILE ──
// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    )

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
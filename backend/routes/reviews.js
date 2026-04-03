const express = require('express')
const Review  = require('../models/Review')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

// ── GET REVIEWS FOR A DESTINATION ──
// GET /api/reviews/:destinationId
router.get('/:destinationId', async (req, res) => {
  try {
    const reviews = await Review
      .find({
        destination: req.params.destinationId,
        status:      'approved',
      })
      .populate('user', 'name avatar') // fetch user name + avatar
      .sort({ createdAt: -1 })         // newest first

    res.json(reviews)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── CREATE REVIEW ──
// POST /api/reviews
// requires login
router.post('/', protect, async (req, res) => {
  try {
    const { destination, rating, text } = req.body

    // check if user already reviewed this destination
    const existing = await Review.findOne({
      destination,
      user: req.user._id,
    })

    if (existing) {
      return res.status(400).json({
        message: 'You have already reviewed this destination'
      })
    }

    const review = await Review.create({
      destination,
      user:   req.user._id,
      rating,
      text,
    })

    // populate user info before sending back
    await review.populate('user', 'name avatar')

    res.status(201).json(review)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── DELETE REVIEW ──
// DELETE /api/reviews/:id
// admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)

    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }

    res.json({ message: 'Review deleted successfully' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
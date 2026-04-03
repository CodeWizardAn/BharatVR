const express     = require('express')
const Destination = require('../models/Destination')
const { protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

// ── GET ALL DESTINATIONS ──
// GET /api/destinations
// supports: ?category=beach&search=goa&sort=rating
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query

    // build query object dynamically
    let query = { isPublished: true }

    if (category && category !== 'all') {
      query.category = category
    }

    if (search) {
      // search in name and location fields
      query.$or = [
        { name:     { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ]
    }

    // build sort object
    let sortObj = { createdAt: -1 } // default: newest first
    if (sort === 'rating')  sortObj = { averageRating: -1 }
    if (sort === 'reviews') sortObj = { reviewCount: -1 }
    if (sort === 'name')    sortObj = { name: 1 }

    const destinations = await Destination
      .find(query)
      .sort(sortObj)
      .select('-scenes') // don't send scene data in list view
                         // only send it in single destination view

    res.json(destinations)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── GET SINGLE DESTINATION ──
// GET /api/destinations/:slug
router.get('/:slug', async (req, res) => {
  try {
    const destination = await Destination
      .findOne({ slug: req.params.slug })

    if (!destination) {
      return res.status(404).json({
        message: 'Destination not found'
      })
    }

    res.json(destination)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ── CREATE DESTINATION ──
// POST /api/destinations
// admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── UPDATE DESTINATION ──
// PUT /api/destinations/:id
// admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:        true, // return updated document
        runValidators: true, // run schema validators on update
      }
    )

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }

    res.json(destination)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// ── DELETE DESTINATION ──
// DELETE /api/destinations/:id
// admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id)

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }

    res.json({ message: 'Destination deleted successfully' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    // which destination this review belongs to
    destination: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Destination',
      required: true,
    },

    // which user wrote this review
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },

    rating: {
      type:     Number,
      required: [true, 'Rating is required'],
      min:      [1, 'Rating must be at least 1'],
      max:      [5, 'Rating cannot exceed 5'],
    },

    text: {
      type:      String,
      required:  [true, 'Review text is required'],
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [500, 'Review cannot exceed 500 characters'],
    },

    status: {
      type:    String,
      enum:    ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
  },
  {
    timestamps: true,
  }
)

// ── ONE REVIEW PER USER PER DESTINATION ──
// compound index ensures a user can only review
// the same destination once
reviewSchema.index(
  { destination: 1, user: 1 },
  { unique: true }
)

// ── UPDATE DESTINATION AVERAGE RATING ──
// this runs AFTER a review is saved
reviewSchema.post('save', async function () {
  const Destination = require('./Destination')
  const Review      = mongoose.model('Review')

  // get all reviews for this destination
  const stats = await Review.aggregate([
    { $match: { destination: this.destination } },
    {
      $group: {
        _id: '$destination',
        avgRating:   { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      }
    }
  ])

  if (stats.length > 0) {
    await Destination.findByIdAndUpdate(this.destination, {
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount:   stats[0].reviewCount,
    })
  }
})

module.exports = mongoose.model('Review', reviewSchema)
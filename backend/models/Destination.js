const mongoose = require('mongoose')

// hotspot schema — a clickable point inside the VR scene
const hotspotSchema = new mongoose.Schema({
  label:       { type: String, required: true },
  // position in 3D space (x y z)
  position:    { type: String, default: '0 0 -3' },
  // which scene index to go to when clicked
  targetScene: { type: Number, default: 0 },
})

// scene schema — one 360° panoramic view
const sceneSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  image360: { type: String, required: true },
  hotspots: [hotspotSchema],
})

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Destination name is required'],
      trim:     true,
      unique:   true,
    },

    slug: {
      type:   String,
      unique: true,
      // auto-generated from name before saving
    },

    location: {
      type:     String,
      required: [true, 'Location is required'],
    },

    state: {
      type: String,
      default: '',
    },

    category: {
      type:     String,
      required: true,
      enum:     ['landmark', 'beach', 'mountain'],
    },

    description: {
      type:     String,
      required: [true, 'Description is required'],
    },

    // array of 360° scenes
    scenes: [sceneSchema],

    // quick info fields
    bestTime: { type: String, default: '' },
    duration: { type: String, default: '' },
    entry:    { type: String, default: '' },

    // interesting facts array
    facts: [{ type: String }],

    // color theme for the card UI
    color:  { type: String, default: '#1a1208' },
    accent: { type: String, default: '#C9A84C' },

    // thumbnail image
    thumbnail: { type: String, default: '' },

    // average rating — updated whenever a review is added
    averageRating: {
      type:    Number,
      default: 0,
      min:     0,
      max:     5,
    },

    // total number of reviews
    reviewCount: {
      type:    Number,
      default: 0,
    },

    // whether this destination is published or draft
    isPublished: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

// ── AUTO GENERATE SLUG FROM NAME ──
// slug is the URL-friendly version of the name
// "Taj Mahal" becomes "taj-mahal"
destinationSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // remove special chars
      .replace(/\s+/g, '-')         // spaces to hyphens
      .trim()
  }
  next()
})

module.exports = mongoose.model('Destination', destinationSchema)
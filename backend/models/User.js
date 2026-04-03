const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
      minlength: [2, 'Name must be at least 2 characters'],
    },

    email: {
      type:     String,
      required: [true, 'Email is required'],
      unique:   true,
      trim:     true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },

    password: {
      type:      String,
      required:  [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      // select: false means password won't be returned
      // in queries unless explicitly asked
      select: false,
    },

    role: {
      type:    String,
      enum:    ['user', 'admin'],
      default: 'user',
    },

    // array of destination IDs the user saved
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Destination',
      }
    ],

    avatar: {
      type:    String,
      default: '',
    },
  },
  {
    // automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
)

// ── HASH PASSWORD BEFORE SAVING ──
// this runs automatically before every .save() call
userSchema.pre('save', async function (next) {
  // only hash if password was actually changed
  if (!this.isModified('password')) return next()

  // 10 = salt rounds (higher = more secure but slower)
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// ── COMPARE PASSWORD METHOD ──
// we add a custom method to the schema
// usage: const isMatch = await user.comparePassword('enteredPassword')
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const dotenv   = require('dotenv')

// load .env file variables
dotenv.config()

const app = express()

// ── MIDDLEWARE ──
// allows frontend (localhost:5173) to call this backend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

// parses incoming JSON request bodies
app.use(express.json())

// parses URL-encoded form data
app.use(express.urlencoded({ extended: true }))

// ── ROUTES ──
app.use('/api/auth',         require('./routes/auth'))
app.use('/api/destinations', require('./routes/destinations'))
app.use('/api/reviews',      require('./routes/reviews'))
app.use('/api/users',        require('./routes/users'))

// ── ROOT ROUTE (health check) ──
app.get('/', (req, res) => {
  res.json({
    message: 'BharatVR API is running',
    version: '1.0.0',
  })
})

// ── 404 HANDLER ──
// catches any route that doesn't exist
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ── GLOBAL ERROR HANDLER ──
// catches any error thrown anywhere in the app
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: err.message || 'Something went wrong'
  })
})

// ── DATABASE CONNECTION ──
const PORT    = process.env.PORT    || 5000
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
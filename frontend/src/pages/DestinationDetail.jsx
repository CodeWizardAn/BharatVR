import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './DestinationDetail.css'

const DESTINATIONS_DATA = {
  'taj-mahal': {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    category: 'City Landmark',
    accent: '#C9A84C',
    rating: 4.9,
    reviews: 284,
    desc: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.',
    bestTime: 'October – March',
    duration: '2–3 hours',
    entry: '₹1,100 (foreigners)',
    facts: [
      '22,000 artisans worked for 22 years to build it',
      'The minarets are slightly tilted outward to protect the tomb if they fall',
      'Changes color throughout the day — pink at dawn, white at noon, golden at night',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Main View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900001!6m8!1m7!1sCAoSLEFGMVFpcE5fenZfSA!2m2!1d27.17516!2d78.04211!3f180!4f10!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'amber-fort': {
    id: 'amber-fort',
    name: 'Amber Fort',
    location: 'Jaipur, Rajasthan',
    category: 'City Landmark',
    accent: '#D4845A',
    rating: 4.7,
    reviews: 196,
    desc: 'Amber Fort is a fort located in Amer, Rajasthan. The fort is known for its artistic style elements, with its large ramparts and series of gates and cobbled paths.',
    bestTime: 'November – February',
    duration: '2–4 hours',
    entry: '₹500 (foreigners)',
    facts: [
      'Built in 1592 by Raja Man Singh I',
      'The Sheesh Mahal has over 1 million mirror pieces',
      'Elephants still carry tourists up the steep hill',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Fort Entrance',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900002!6m8!1m7!1sCAoSLEFGMVFpcFJqWmtYUQ!2m2!1d26.98508!2d75.85130!3f90!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'mysore-palace': {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    location: 'Mysuru, Karnataka',
    category: 'City Landmark',
    accent: '#A855D4',
    rating: 4.8,
    reviews: 231,
    desc: 'The Mysore Palace is a historical palace and royal residence. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.',
    bestTime: 'October – February',
    duration: '1–2 hours',
    entry: '₹200 (Indians)',
    facts: [
      'Illuminated by 97,000 bulbs every Sunday',
      'Second most visited monument in India after the Taj Mahal',
      'The current palace was built in 1912',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Palace Front',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900003!6m8!1m7!1sCAoSLEFGMVFpcHpkbEZfUQ!2m2!1d12.30524!2d76.65529!3f0!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'hawa-mahal': {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    category: 'City Landmark',
    accent: '#E07850',
    rating: 4.6,
    reviews: 178,
    desc: 'Hawa Mahal is a palace in Jaipur built from red and pink sandstone with 953 small windows called jharokhas.',
    bestTime: 'November – March',
    duration: '1 hour',
    entry: '₹200 (foreigners)',
    facts: [
      '953 small windows called jharokhas',
      'Built in 1799 by Maharaja Sawai Pratap Singh',
      'The honeycomb design keeps the interior cool in summer',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Front View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900004!6m8!1m7!1sCAoSLEFGMVFpcGNXbGJfUQ!2m2!1d26.92385!2d75.82681!3f270!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'radhanagar-beach': {
    id: 'radhanagar-beach',
    name: 'Radhanagar Beach',
    location: 'Havelock Island, Andaman',
    category: 'Beach',
    accent: '#3B9ECC',
    rating: 4.9,
    reviews: 312,
    desc: 'Radhanagar Beach is located on the western side of Havelock Island. It has been rated as the best beach in Asia by Time magazine.',
    bestTime: 'November – April',
    duration: 'Half day',
    entry: 'Free',
    facts: [
      'Rated best beach in Asia by Time magazine',
      'Water so clear you can see the sea floor from the surface',
      'Nesting ground for Olive Ridley sea turtles',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Beach View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900005!6m8!1m7!1sCAoSLEFGMVFpcEl6WlpmUQ!2m2!1d11.98472!2d92.99638!3f180!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'palolem-beach': {
    id: 'palolem-beach',
    name: 'Palolem Beach',
    location: 'South Goa',
    category: 'Beach',
    accent: '#2AB8A0',
    rating: 4.5,
    reviews: 145,
    desc: 'Palolem is a beach in South Goa — a crescent shaped bay and one of the most beautiful beaches in Goa.',
    bestTime: 'November – March',
    duration: 'Full day',
    entry: 'Free',
    facts: [
      'One of the few beaches in Goa with calm swimmable waters',
      'Famous for silent noise parties with headphones',
      'Dolphins frequently spotted just offshore',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Bay View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900006!6m8!1m7!1sCAoSLEFGMVFpcFpqWmtYUQ!2m2!1d15.01013!2d74.02311!3f0!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'varkala-beach': {
    id: 'varkala-beach',
    name: 'Varkala Beach',
    location: 'Thiruvananthapuram, Kerala',
    category: 'Beach',
    accent: '#E8954A',
    rating: 4.6,
    reviews: 167,
    desc: 'Varkala Beach is one of the few places in Kerala where dramatic cliffs are found adjacent to the Arabian Sea.',
    bestTime: 'October – March',
    duration: 'Half day',
    entry: 'Free',
    facts: [
      'The cliffs contain fossils that are 50 million years old',
      'Natural mineral springs seep through the cliff face',
      'Also called Papanasam beach — believed to wash away sins',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Cliff View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900007!6m8!1m7!1sCAoSLEFGMVFpcGNXbGtYUQ!2m2!1d8.73318!2d76.71628!3f90!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'marina-beach': {
    id: 'marina-beach',
    name: 'Marina Beach',
    location: 'Chennai, Tamil Nadu',
    category: 'Beach',
    accent: '#4A90CC',
    rating: 4.3,
    reviews: 198,
    desc: 'Marina Beach is a natural urban beach in Chennai along the Bay of Bengal — the second longest urban beach in the world.',
    bestTime: 'November – February',
    duration: '2–3 hours',
    entry: 'Free',
    facts: [
      "World's second longest urban beach at 13km",
      'Home to statues of many Tamil leaders',
      'The sunrise here is one of the most photographed in India',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Beach View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900008!6m8!1m7!1sCAoSLEFGMVFpcHpkbEtYUQ!2m2!1d13.05005!2d80.28232!3f180!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'munnar': {
    id: 'munnar',
    name: 'Munnar Tea Gardens',
    location: 'Idukki, Kerala',
    category: 'Mountains & Nature',
    accent: '#5EA832',
    rating: 4.8,
    reviews: 267,
    desc: 'Munnar is a hill station in the Western Ghats known for its rolling hills adorned with tea plantations at 1,600m altitude.',
    bestTime: 'September – March',
    duration: 'Full day',
    entry: 'Free',
    facts: [
      'Highest tea estates in the world at 1,600m',
      'The rare Neelakurinji flower blooms here once every 12 years',
      'Over 30 types of wild orchids in the surrounding forests',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Tea Gardens',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900009!6m8!1m7!1sCAoSLEFGMVFpcEl6WlptUQ!2m2!1d10.08854!2d77.05954!3f270!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'rohtang-pass': {
    id: 'rohtang-pass',
    name: 'Rohtang Pass',
    location: 'Manali, Himachal Pradesh',
    category: 'Mountains & Nature',
    accent: '#7EB8E8',
    rating: 4.7,
    reviews: 189,
    desc: 'Rohtang Pass is a high mountain pass on the eastern Pir Panjal Range of the Himalayas at 3,978 metres above sea level.',
    bestTime: 'May – October',
    duration: 'Full day',
    entry: '₹500 per vehicle',
    facts: [
      'Located at an altitude of 3,978 metres above sea level',
      'The name means pile of corpses due to dangerous weather',
      'Connects the green Kullu valley to the barren Lahaul-Spiti plateau',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Pass View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900010!6m8!1m7!1sCAoSLEFGMVFpcFJqWmtZUQ!2m2!1d32.37119!2d77.24462!3f0!4f10!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'kerala-backwaters': {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    category: 'Mountains & Nature',
    accent: '#2AAA70',
    rating: 4.8,
    reviews: 243,
    desc: 'The Kerala backwaters are a network of interconnected canals, rivers, lakes and inlets forming over 900 km of waterways.',
    bestTime: 'October – March',
    duration: 'Overnight stay',
    entry: '₹8,000+ houseboat',
    facts: [
      'Over 900km of interconnected waterways',
      'Traditional houseboats called Kettuvallam made without a single nail',
      'Over 400 species of birds spotted in the region',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Backwater View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900011!6m8!1m7!1sCAoSLEFGMVFpcGNXbGtZUQ!2m2!1d9.49857!2d76.33932!3f180!4f0!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
  'dudhsagar-falls': {
    id: 'dudhsagar-falls',
    name: 'Dudhsagar Falls',
    location: 'Sonaulim, Goa',
    category: 'Mountains & Nature',
    accent: '#4AC4A0',
    rating: 4.7,
    reviews: 156,
    desc: 'Dudhsagar Falls is a four-tiered waterfall on the Mandovi River — one of India\'s tallest waterfalls at 310 metres.',
    bestTime: 'June – December',
    duration: 'Half day',
    entry: '₹400 jeep safari',
    facts: [
      'One of India\'s tallest waterfalls at 310 metres high',
      'The name means Sea of Milk due to white foamy appearance',
      'The railway track passes right in front of the waterfall',
    ],
    scenes: [
      {
        id: 'main',
        label: 'Falls View',
        image360: 'https://www.google.com/maps/embed?pb=!4v1699900012!6m8!1m7!1sCAoSLEFGMVFpcHpkbEtZUQ!2m2!1d15.31405!2d74.31456!3f90!4f10!5f0.7820865974627469',
        isStreetView: true,
      },
    ],
  },
}

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map((s) => (
        <span
          key={s}
          className={`star ${s <= Math.round(rating) ? 'star--filled' : ''}`}
        >★</span>
      ))}
      <span className="stars__num">{rating}</span>
    </div>
  )
}

function DestinationDetail() {
  const { id }   = useParams()
  const { user } = useAuth()

  const [activeScene,  setActiveScene]  = useState(0)
  const [vrMode,       setVrMode]       = useState(false)
  const [saved,        setSaved]        = useState(false)
  const [reviewText,   setReviewText]   = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviews,      setReviews]      = useState([])
  const [reviewError,  setReviewError]  = useState('')

  const dest = DESTINATIONS_DATA[id]

  useEffect(() => {
    window.scrollTo(0, 0)
    setVrMode(false)
    setActiveScene(0)
  }, [id])

  if (!dest) {
    return (
      <div className="detail-notfound">
        <h2>Destination not found</h2>
        <Link to="/destinations" className="btn btn-primary">
          Back to Destinations
        </Link>
      </div>
    )
  }

  const currentScene = dest.scenes[activeScene]

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewText.trim()) {
      setReviewError('Please write a review')
      return
    }
    const newReview = {
      id:        Date.now(),
      user:      { name: user?.name || 'Anonymous' },
      rating:    reviewRating,
      text:      reviewText,
      createdAt: new Date().toISOString(),
    }
    setReviews((prev) => [newReview, ...prev])
    setReviewText('')
    setReviewRating(5)
    setReviewError('')
  }

  return (
    <motion.div
      className="detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* VR WRAPPER */}
      <div className="detail__vr-wrapper">
        <div className="detail__vr-container">
          {vrMode ? (
            <AFrameViewer
              imageUrl={currentScene.image360}
              isStreetView={currentScene.isStreetView}
              onClose={() => setVrMode(false)}
            />
          ) : (
            <div
              className="detail__preview"
              onClick={() => setVrMode(true)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="detail__preview-img"
                style={{ background: dest.color || '#1a1208' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: dest.accent + '22',
                    filter: 'blur(40px)',
                  }}
                />
              </div>
              <div className="detail__preview-overlay" />
              <button
                className="detail__enter-vr"
                style={{ '--accent': dest.accent }}
              >
                <div className="detail__enter-vr-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M2 8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8z"/>
                    <circle cx="8.5" cy="12" r="1.5"/>
                    <circle cx="15.5" cy="12" r="1.5"/>
                  </svg>
                </div>
                <span>Enter 360° VR</span>
                <p>Click to explore · Drag to look around</p>
              </button>
              <div className="detail__360-badge"><span>360°</span></div>
            </div>
          )}
        </div>

        {dest.scenes.length > 1 && (
          <div className="detail__scenes">
            {dest.scenes.map((scene, i) => (
              <button
                key={scene.id}
                className={`detail__scene-btn
                  ${activeScene === i ? 'detail__scene-btn--active' : ''}`}
                onClick={() => { setActiveScene(i); setVrMode(false) }}
                style={activeScene === i
                  ? { borderColor: dest.accent, color: dest.accent }
                  : {}}
              >
                {scene.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="container">
        <div className="detail__layout">

          {/* LEFT */}
          <div className="detail__main">
            <div className="detail__breadcrumb">
              <Link to="/destinations">Destinations</Link>
              <span>/</span>
              <span style={{ color: dest.accent }}>{dest.name}</span>
            </div>

            <div className="detail__meta">
              <span
                className="detail__cat"
                style={{ color: dest.accent, borderColor: dest.accent + '44' }}
              >
                {dest.category}
              </span>
              <Stars rating={dest.rating} />
              <span className="detail__reviews">{dest.reviews} reviews</span>
            </div>

            <h1 className="detail__title">{dest.name}</h1>

            <p className="detail__loc">
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {dest.location}
            </p>

            <p className="detail__desc">{dest.desc}</p>

            <div className="detail__quick-facts">
              {[
                { label: 'Best Time', value: dest.bestTime },
                { label: 'Duration',  value: dest.duration },
                { label: 'Entry Fee', value: dest.entry },
              ].map((f) => (
                <div key={f.label} className="detail__fact">
                  <span className="detail__fact-label">{f.label}</span>
                  <span
                    className="detail__fact-value"
                    style={{ color: dest.accent }}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="detail__facts">
              <h3 className="detail__facts-title">Did You Know?</h3>
              <ul className="detail__facts-list">
                {dest.facts.map((fact, i) => (
                  <li key={i} className="detail__facts-item">
                    <span
                      className="detail__facts-dot"
                      style={{ background: dest.accent }}
                    />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* REVIEWS */}
            <div className="detail__reviews-section">
              <h3 className="detail__facts-title">
                Reviews ({reviews.length})
              </h3>

              {user ? (
                <form
                  onSubmit={handleReviewSubmit}
                  className="detail__review-form"
                >
                  <div className="detail__review-stars">
                    {[1,2,3,4,5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`detail__review-star
                          ${s <= reviewRating ? 'active' : ''}`}
                        onClick={() => setReviewRating(s)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="auth-input detail__review-textarea"
                    rows={3}
                  />
                  {reviewError && (
                    <p className="auth-field-error">{reviewError}</p>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: 'fit-content' }}
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <p className="detail__review-login">
                  <Link to="/login" style={{ color: dest.accent }}>
                    Sign in
                  </Link>{' '}
                  to write a review
                </p>
              )}

              <div className="detail__reviews-list">
                {reviews.length === 0 ? (
                  <p className="detail__no-reviews">
                    No reviews yet. Be the first!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="detail__review-card">
                      <div className="detail__review-card-top">
                        <div className="detail__reviewer">
                          <div className="detail__reviewer-avatar">
                            {review.user?.name?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="detail__reviewer-name">
                              {review.user?.name}
                            </p>
                            <Stars rating={review.rating} />
                          </div>
                        </div>
                        <span className="detail__review-date">
                          {new Date(review.createdAt)
                            .toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                        </span>
                      </div>
                      <p className="detail__review-text">{review.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* SIDEBAR */}
          <div className="detail__sidebar">
            <div className="detail__actions">
              <button
                className="btn btn-primary detail__vr-btn"
                style={{ background: dest.accent, borderColor: dest.accent }}
                onClick={() => {
                  setVrMode(true)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M2 8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8z"/>
                  <circle cx="8.5" cy="12" r="1.5"/>
                  <circle cx="15.5" cy="12" r="1.5"/>
                </svg>
                Enter VR Experience
              </button>

              <button
                className={`btn btn-outline detail__save-btn
                  ${saved ? 'detail__save-btn--saved' : ''}`}
                onClick={() => setSaved(!saved)}
              >
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill={saved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                {saved ? 'Saved!' : 'Save Place'}
              </button>
            </div>

            <div className="detail__instructions">
              <h4>How to explore</h4>
              <ul>
                {[
                  { icon: '🖱', text: 'Click and drag to look around' },
                  { icon: '📱', text: 'On mobile tilt your phone' },
                  { icon: '🔍', text: 'Scroll to zoom in and out' },
                  { icon: '🥽', text: 'Use VR headset for full immersion' },
                ].map((item) => (
                  <li key={item.text}>
                    <span className="detail__inst-icon">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/destinations" className="detail__back">
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Destinations
            </Link>
          </div>

        </div>
      </div>

    </motion.div>
  )
}
function AFrameViewer({ imageUrl, isStreetView, onClose }) {
  useEffect(() => {
    if (!isStreetView) {
      if (!document.querySelector('script[src*="aframe"]')) {
        const script = document.createElement('script')
        script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
        script.async = true
        document.head.appendChild(script)
      }
    }
  }, [])

  return (
    <div className="aframe-wrapper">
      <button className="aframe-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
        Exit VR
      </button>

      {isStreetView ? (
        <iframe
          src={imageUrl}
          className="aframe-scene-container"
          allowFullScreen
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 'none', width: '100%', height: '100%' }}
          title="360 VR View"
        />
      ) : (
        <div
          className="aframe-scene-container"
          dangerouslySetInnerHTML={{
            __html: `
              <a-scene
                embedded
                vr-mode-ui="enabled: true"
                loading-screen="enabled: false"
                style="width:100%;height:100%;"
              >
                <a-sky src="${imageUrl}" rotation="0 -90 0"></a-sky>
                <a-camera
                  position="0 1.6 0"
                  look-controls="reverseMouseDrag: false"
                  wasd-controls="enabled: false"
                ></a-camera>
              </a-scene>
            `
          }}
        />
      )}

      <div className="aframe-hint">
        Drag to look around · Scroll to zoom
      </div>
    </div>
  )
}

export default DestinationDetail 
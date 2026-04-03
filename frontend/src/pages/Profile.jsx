import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Profile.css'

// ── MOCK USER DATA (will come from API later) ──
const MOCK_USER = {
  name:      'Preethi S',
  email:     'preethi@example.com',
  joined:    'January 2025',
  avatar:    'P',
  totalVR:   8,
  totalSaved: 5,
  totalReviews: 3,
}

const MOCK_SAVED = [
  { id: 'taj-mahal',        name: 'Taj Mahal',         location: 'Agra, UP',        color: '#2d1a00', accent: '#C9A84C' },
  { id: 'munnar',           name: 'Munnar Tea Gardens', location: 'Idukki, Kerala',  color: '#0a1e00', accent: '#5EA832' },
  { id: 'radhanagar-beach', name: 'Radhanagar Beach',  location: 'Andaman',         color: '#001a2d', accent: '#3B9ECC' },
  { id: 'rohtang-pass',     name: 'Rohtang Pass',      location: 'Manali, HP',      color: '#0c1020', accent: '#7EB8E8' },
  { id: 'mysore-palace',    name: 'Mysore Palace',     location: 'Mysuru, KA',      color: '#160024', accent: '#A855D4' },
]

const MOCK_REVIEWS = [
  {
    id: 1,
    destination: 'Taj Mahal',
    destId:      'taj-mahal',
    rating:      5,
    text:        'Absolutely breathtaking in 360°. The detail in the marble work is incredible. Felt like I was actually standing there!',
    date:        '15 Mar 2025',
  },
  {
    id: 2,
    destination: 'Munnar Tea Gardens',
    destId:      'munnar',
    rating:      5,
    text:        'The green hills stretching to the horizon is so calming. Best virtual experience I have had.',
    date:        '20 Feb 2025',
  },
  {
    id: 3,
    destination: 'Rohtang Pass',
    destId:      'rohtang-pass',
    rating:      4,
    text:        'Snow everywhere! The panoramic view of the Himalayas is stunning. Would love to visit for real someday.',
    date:        '10 Jan 2025',
  },
]

// reusable stars
function Stars({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={`star ${s <= rating ? 'star--filled' : ''}`}>★</span>
      ))}
    </div>
  )
}

function Profile() {
  const [activeTab, setActiveTab] = useState('saved')
  const [saved,     setSaved]     = useState(MOCK_SAVED)

  // remove a saved destination
  const handleUnsave = (id) => {
    setSaved((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ── PROFILE HEADER ── */}
      <div className="profile-header">
        <div className="profile-header__bg" />
        <div className="container">
          <div className="profile-header__inner">

            {/* Avatar */}
            <motion.div
              className="profile-avatar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {MOCK_USER.avatar}
            </motion.div>

            {/* User info */}
            <motion.div
              className="profile-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="profile-name">{MOCK_USER.name}</h1>
              <p className="profile-email">{MOCK_USER.email}</p>
              <p className="profile-joined">
                Member since {MOCK_USER.joined}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="profile-stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { num: MOCK_USER.totalVR,      label: 'VR Tours' },
                { num: MOCK_USER.totalSaved,   label: 'Saved' },
                { num: MOCK_USER.totalReviews, label: 'Reviews' },
              ].map((stat) => (
                <div key={stat.label} className="profile-stat">
                  <span className="profile-stat__num">{stat.num}</span>
                  <span className="profile-stat__label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="profile-tabs">
        <div className="container">
          <div className="profile-tabs__inner">
            {[
              { id: 'saved',   label: `Saved Places (${saved.length})` },
              { id: 'reviews', label: `My Reviews (${MOCK_REVIEWS.length})` },
              { id: 'settings',label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`profile-tab ${activeTab === tab.id ? 'profile-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="profile-tab__indicator"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="container profile-content">

        {/* ── SAVED TAB ── */}
        {activeTab === 'saved' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {saved.length === 0 ? (
              <div className="profile-empty">
                <p className="profile-empty__icon">♡</p>
                <h3>No saved places yet</h3>
                <p>Explore destinations and save your favourites</p>
                <Link to="/destinations" className="btn btn-primary">
                  Browse Destinations
                </Link>
              </div>
            ) : (
              <div className="profile-saved-grid">
                {saved.map((dest, i) => (
                  <motion.div
                    key={dest.id}
                    className="profile-saved-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    layout
                  >
                    {/* color block */}
                    <div
                      className="profile-saved-card__img"
                      style={{ background: dest.color }}
                    >
                      <div
                        className="profile-saved-card__glow"
                        style={{ background: dest.accent }}
                      />
                    </div>

                    <div className="profile-saved-card__body">
                      <div>
                        <h4 className="profile-saved-card__name">
                          {dest.name}
                        </h4>
                        <p className="profile-saved-card__loc">
                          {dest.location}
                        </p>
                      </div>
                      <div className="profile-saved-card__actions">
                        <Link
                          to={`/destinations/${dest.id}`}
                          className="btn btn-ghost"
                          style={{ fontSize: '0.68rem', padding: '0.4rem 0.9rem' }}
                        >
                          View VR
                        </Link>
                        <button
                          className="profile-unsave"
                          onClick={() => handleUnsave(dest.id)}
                          aria-label="Remove from saved"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── REVIEWS TAB ── */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="profile-reviews"
          >
            {MOCK_REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                className="profile-review-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="profile-review-card__top">
                  <div>
                    <Link
                      to={`/destinations/${review.destId}`}
                      className="profile-review-card__dest"
                    >
                      {review.destination}
                    </Link>
                    <Stars rating={review.rating} />
                  </div>
                  <span className="profile-review-card__date">
                    {review.date}
                  </span>
                </div>
                <p className="profile-review-card__text">{review.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <motion.div
            className="profile-settings"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="settings-card">
              <h3 className="settings-card__title">
                Account Information
              </h3>

              <div className="settings-form">
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-input"
                      type="text"
                      defaultValue={MOCK_USER.name}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <input
                      className="auth-input"
                      type="email"
                      defaultValue={MOCK_USER.email}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <button className="btn btn-primary" style={{ width: 'fit-content' }}>
                  Save Changes
                </button>
              </div>
            </div>

            <div className="settings-card settings-card--danger">
              <h3 className="settings-card__title">Danger Zone</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Once you delete your account, there is no going back.
              </p>
              <button className="btn btn-outline" style={{ borderColor: '#e05', color: '#e05' }}>
                Delete Account
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </motion.div>
  )
}

export default Profile
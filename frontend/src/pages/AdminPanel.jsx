import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './AdminPanel.css'

// ── MOCK DATA ──
const MOCK_DESTINATIONS = [
  { id: 'taj-mahal',        name: 'Taj Mahal',          category: 'landmark', location: 'Agra, UP',       reviews: 284, rating: 4.9, accent: '#C9A84C' },
  { id: 'amber-fort',       name: 'Amber Fort',          category: 'landmark', location: 'Jaipur, RJ',     reviews: 196, rating: 4.7, accent: '#D4845A' },
  { id: 'mysore-palace',    name: 'Mysore Palace',       category: 'landmark', location: 'Mysuru, KA',     reviews: 231, rating: 4.8, accent: '#A855D4' },
  { id: 'hawa-mahal',       name: 'Hawa Mahal',          category: 'landmark', location: 'Jaipur, RJ',     reviews: 178, rating: 4.6, accent: '#E07850' },
  { id: 'radhanagar-beach', name: 'Radhanagar Beach',   category: 'beach',    location: 'Andaman',         reviews: 312, rating: 4.9, accent: '#3B9ECC' },
  { id: 'palolem-beach',    name: 'Palolem Beach',       category: 'beach',    location: 'South Goa',       reviews: 145, rating: 4.5, accent: '#2AB8A0' },
  { id: 'varkala-beach',    name: 'Varkala Beach',       category: 'beach',    location: 'Kerala',          reviews: 167, rating: 4.6, accent: '#E8954A' },
  { id: 'marina-beach',     name: 'Marina Beach',        category: 'beach',    location: 'Chennai, TN',     reviews: 198, rating: 4.3, accent: '#4A90CC' },
  { id: 'munnar',           name: 'Munnar Tea Gardens', category: 'mountain', location: 'Idukki, KL',      reviews: 267, rating: 4.8, accent: '#5EA832' },
  { id: 'rohtang-pass',     name: 'Rohtang Pass',        category: 'mountain', location: 'Manali, HP',      reviews: 189, rating: 4.7, accent: '#7EB8E8' },
  { id: 'kerala-backwaters',name: 'Kerala Backwaters',  category: 'mountain', location: 'Alleppey, KL',    reviews: 243, rating: 4.8, accent: '#2AAA70' },
  { id: 'dudhsagar-falls',  name: 'Dudhsagar Falls',    category: 'mountain', location: 'Sonaulim, GA',    reviews: 156, rating: 4.7, accent: '#4AC4A0' },
]

const MOCK_USERS = [
  { id: 1, name: 'Preethi S',    email: 'preethi@example.com', role: 'admin',  joined: '01 Jan 2025', reviews: 3  },
  { id: 2, name: 'Rahul Kumar',  email: 'rahul@example.com',   role: 'user',   joined: '10 Jan 2025', reviews: 7  },
  { id: 3, name: 'Ananya Shah',  email: 'ananya@example.com',  role: 'user',   joined: '15 Feb 2025', reviews: 2  },
  { id: 4, name: 'Vikram Nair',  email: 'vikram@example.com',  role: 'user',   joined: '20 Feb 2025', reviews: 12 },
  { id: 5, name: 'Meera Pillai', email: 'meera@example.com',   role: 'user',   joined: '05 Mar 2025', reviews: 5  },
]

const MOCK_REVIEWS = [
  { id: 1, user: 'Rahul Kumar',  destination: 'Taj Mahal',       rating: 5, text: 'Absolutely stunning experience!',       date: '15 Mar 2025', status: 'approved' },
  { id: 2, user: 'Ananya Shah',  destination: 'Munnar',           rating: 4, text: 'Beautiful green hills, very relaxing.',  date: '18 Mar 2025', status: 'approved' },
  { id: 3, user: 'Vikram Nair',  destination: 'Rohtang Pass',     rating: 5, text: 'Snow everywhere! Loved every second.',   date: '20 Mar 2025', status: 'pending'  },
  { id: 4, user: 'Meera Pillai', destination: 'Radhanagar Beach', rating: 5, text: 'Best beach in Asia, no doubt!',          date: '22 Mar 2025', status: 'pending'  },
]

// ── ADD DESTINATION FORM (empty state) ──
const EMPTY_FORM = {
  name:      '',
  location:  '',
  category:  'landmark',
  desc:      '',
  bestTime:  '',
  duration:  '',
  entry:     '',
  image360:  '',
}

function AdminPanel() {
  const [activeTab,    setActiveTab]    = useState('overview')
  const [destinations, setDestinations] = useState(MOCK_DESTINATIONS)
  const [users,        setUsers]        = useState(MOCK_USERS)
  const [reviews,      setReviews]      = useState(MOCK_REVIEWS)
  const [showAddForm,  setShowAddForm]  = useState(false)
  const [formData,     setFormData]     = useState(EMPTY_FORM)
  const [deleteConfirm,setDeleteConfirm]= useState(null)
  const [formErrors,   setFormErrors]   = useState({})
  const [saveSuccess,  setSaveSuccess]  = useState(false)

  // ── FORM HANDLERS ──
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const e = {}
    if (!formData.name.trim())     e.name     = 'Name is required'
    if (!formData.location.trim()) e.location = 'Location is required'
    if (!formData.desc.trim())     e.desc     = 'Description is required'
    if (!formData.image360.trim()) e.image360 = '360° image URL is required'
    return e
  }

  const handleAddDestination = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    // add to list (in real app this calls the API)
    const newDest = {
      id:       formData.name.toLowerCase().replace(/\s+/g, '-'),
      name:     formData.name,
      category: formData.category,
      location: formData.location,
      reviews:  0,
      rating:   0,
      accent:   '#C9A84C',
    }
    setDestinations((prev) => [newDest, ...prev])
    setFormData(EMPTY_FORM)
    setShowAddForm(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // ── DELETE DESTINATION ──
  const handleDelete = (id) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id))
    setDeleteConfirm(null)
  }

  // ── REVIEW MODERATION ──
  const handleApprove = (id) => {
    setReviews((prev) =>
      prev.map((r) => r.id === id ? { ...r, status: 'approved' } : r)
    )
  }

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  // ── STATS ──
  const stats = [
    { label: 'Total Destinations', value: destinations.length,                           accent: '#C9A84C' },
    { label: 'Total Users',        value: users.length,                                   accent: '#3B9ECC' },
    { label: 'Total Reviews',      value: reviews.length,                                 accent: '#5EA832' },
    { label: 'Pending Reviews',    value: reviews.filter(r => r.status === 'pending').length, accent: '#E8954A' },
  ]

  return (
    <motion.div
      className="admin-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ── HEADER ── */}
      <div className="admin-header">
        <div className="admin-header__bg" />
        <div className="container">
          <motion.div
            className="admin-header__inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1 className="admin-title">Admin <em>Panel</em></h1>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              + Add Destination
            </button>
          </motion.div>

          {/* stats row */}
          <div className="admin-stats">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="admin-stat"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <span
                  className="admin-stat__num"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </span>
                <span className="admin-stat__label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SUCCESS TOAST ── */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            className="admin-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            ✓ Destination added successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TABS ── */}
      <div className="admin-tabs">
        <div className="container">
          <div className="admin-tabs__inner">
            {[
              { id: 'overview',     label: 'Destinations' },
              { id: 'users',        label: 'Users' },
              { id: 'reviews',      label: `Reviews ${reviews.filter(r=>r.status==='pending').length > 0 ? `(${reviews.filter(r=>r.status==='pending').length} pending)` : ''}` },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`admin-tab ${activeTab === tab.id ? 'admin-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div className="admin-tab__indicator" layoutId="admin-tab-line" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container admin-content">

        {/* ════════════════════
            DESTINATIONS TAB
        ════════════════════ */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((dest, i) => (
                    <motion.tr
                      key={dest.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      layout
                    >
                      <td>
                        <div className="admin-table__dest">
                          <div
                            className="admin-table__dot"
                            style={{ background: dest.accent }}
                          />
                          <span className="admin-table__name">{dest.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge">
                          {dest.category}
                        </span>
                      </td>
                      <td className="admin-table__muted">{dest.location}</td>
                      <td>
                        <span style={{ color: dest.accent, fontWeight: 500 }}>
                          {dest.rating > 0 ? `★ ${dest.rating}` : '—'}
                        </span>
                      </td>
                      <td className="admin-table__muted">{dest.reviews}</td>
                      <td>
                        <div className="admin-table__actions">
                          <Link
                            to={`/destinations/${dest.id}`}
                            className="admin-action-btn admin-action-btn--view"
                          >
                            View
                          </Link>
                          <button
                            className="admin-action-btn admin-action-btn--delete"
                            onClick={() => setDeleteConfirm(dest.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ════════════════
            USERS TAB
        ════════════════ */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <td>
                        <div className="admin-table__dest">
                          <div className="admin-user-avatar">
                            {user.name[0]}
                          </div>
                          <span className="admin-table__name">{user.name}</span>
                        </div>
                      </td>
                      <td className="admin-table__muted">{user.email}</td>
                      <td>
                        <span className={`admin-badge ${user.role === 'admin' ? 'admin-badge--gold' : ''}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="admin-table__muted">{user.joined}</td>
                      <td className="admin-table__muted">{user.reviews}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ════════════════
            REVIEWS TAB
        ════════════════ */}
        {activeTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="admin-reviews"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                className="admin-review-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                layout
              >
                <div className="admin-review-card__top">
                  <div className="admin-review-card__meta">
                    <span className="admin-review-card__user">{review.user}</span>
                    <span className="admin-review-card__dest">on {review.destination}</span>
                    <span className="admin-review-card__rating">
                      {'★'.repeat(review.rating)}
                    </span>
                  </div>
                  <div className="admin-review-card__right">
                    <span className="admin-review-card__date">{review.date}</span>
                    <span className={`admin-status ${review.status === 'approved' ? 'admin-status--approved' : 'admin-status--pending'}`}>
                      {review.status}
                    </span>
                  </div>
                </div>
                <p className="admin-review-card__text">{review.text}</p>
                <div className="admin-review-card__actions">
                  {review.status === 'pending' && (
                    <button
                      className="admin-action-btn admin-action-btn--approve"
                      onClick={() => handleApprove(review.id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="admin-action-btn admin-action-btn--delete"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* ════════════════════════════
          ADD DESTINATION MODAL
      ════════════════════════════ */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="admin-modal"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal__header">
                <h3>Add New Destination</h3>
                <button
                  className="admin-modal__close"
                  onClick={() => setShowAddForm(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddDestination} className="admin-form">

                <div className="admin-form__row">
                  <div className="auth-field">
                    <label className="auth-label">Destination Name *</label>
                    <div className={`auth-input-wrap ${formErrors.name ? 'auth-input-wrap--error' : ''}`}>
                      <input
                        name="name"
                        className="auth-input"
                        placeholder="e.g. Hampi Ruins"
                        value={formData.name}
                        onChange={handleFormChange}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                    {formErrors.name && <span className="auth-field-error">{formErrors.name}</span>}
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Location *</label>
                    <div className="auth-input-wrap">
                      <input
                        name="location"
                        className="auth-input"
                        placeholder="e.g. Bellary, Karnataka"
                        value={formData.location}
                        onChange={handleFormChange}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                    {formErrors.location && <span className="auth-field-error">{formErrors.location}</span>}
                  </div>
                </div>

                <div className="admin-form__row">
                  <div className="auth-field">
                    <label className="auth-label">Category</label>
                    <select
                      name="category"
                      className="auth-input"
                      value={formData.category}
                      onChange={handleFormChange}
                      style={{ paddingLeft: '1rem' }}
                    >
                      <option value="landmark">City Landmark</option>
                      <option value="beach">Beach</option>
                      <option value="mountain">Mountains & Nature</option>
                    </select>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Best Time to Visit</label>
                    <div className="auth-input-wrap">
                      <input
                        name="bestTime"
                        className="auth-input"
                        placeholder="e.g. October – March"
                        value={formData.bestTime}
                        onChange={handleFormChange}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Description *</label>
                  <textarea
                    name="desc"
                    className="auth-input"
                    placeholder="Describe the destination..."
                    value={formData.desc}
                    onChange={handleFormChange}
                    rows={3}
                    style={{ paddingLeft: '1rem', paddingTop: '0.75rem', resize: 'vertical' }}
                  />
                  {formErrors.desc && <span className="auth-field-error">{formErrors.desc}</span>}
                </div>

                <div className="auth-field">
                  <label className="auth-label">360° Image URL *</label>
                  <div className="auth-input-wrap">
                    <input
                      name="image360"
                      className="auth-input"
                      placeholder="https://res.cloudinary.com/..."
                      value={formData.image360}
                      onChange={handleFormChange}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                  {formErrors.image360 && <span className="auth-field-error">{formErrors.image360}</span>}
                </div>

                <div className="admin-form__row">
                  <div className="auth-field">
                    <label className="auth-label">Duration</label>
                    <div className="auth-input-wrap">
                      <input
                        name="duration"
                        className="auth-input"
                        placeholder="e.g. 2–3 hours"
                        value={formData.duration}
                        onChange={handleFormChange}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Entry Fee</label>
                    <div className="auth-input-wrap">
                      <input
                        name="entry"
                        className="auth-input"
                        placeholder="e.g. ₹500"
                        value={formData.entry}
                        onChange={handleFormChange}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form__footer">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Destination
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════
          DELETE CONFIRM MODAL
      ════════════════════════ */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              className="admin-modal admin-modal--sm"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: '0.75rem' }}>Delete Destination?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
                This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#e05', borderColor: '#e05' }}
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default AdminPanel
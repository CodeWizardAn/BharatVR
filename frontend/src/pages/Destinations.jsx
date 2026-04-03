import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Destinations.css'

// ── ALL 12 INDIA DESTINATIONS ──
const ALL_DESTINATIONS = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    category: 'landmark',
    categoryLabel: 'City Landmark',
    desc: 'The crown jewel of India. An ivory-white marble mausoleum on the bank of the Yamuna river, built by Emperor Shah Jahan.',
    color: '#2d1a00',
    accent: '#C9A84C',
    rating: 4.9,
    reviews: 284,
  },
  {
    id: 'amber-fort',
    name: 'Amber Fort',
    location: 'Jaipur, Rajasthan',
    category: 'landmark',
    categoryLabel: 'City Landmark',
    desc: 'A majestic hilltop fortress with ornate palaces, halls of mirrors and sweeping valley views over Maota Lake.',
    color: '#3d1500',
    accent: '#D4845A',
    rating: 4.7,
    reviews: 196,
  },
  {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    location: 'Mysuru, Karnataka',
    category: 'landmark',
    categoryLabel: 'City Landmark',
    desc: 'One of India\'s most visited monuments — illuminated by nearly 100,000 bulbs every Sunday evening.',
    color: '#160024',
    accent: '#A855D4',
    rating: 4.8,
    reviews: 231,
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    category: 'landmark',
    categoryLabel: 'City Landmark',
    desc: 'The Palace of Winds — a stunning pink sandstone façade with 953 small windows designed for royal ladies to observe street life.',
    color: '#2a0800',
    accent: '#E07850',
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 'radhanagar-beach',
    name: 'Radhanagar Beach',
    location: 'Havelock Island, Andaman',
    category: 'beach',
    categoryLabel: 'Beach',
    desc: 'Asia\'s finest beach. Pristine white sand, crystal-clear turquoise water, and untouched tropical rainforest.',
    color: '#001a2d',
    accent: '#3B9ECC',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 'palolem-beach',
    name: 'Palolem Beach',
    location: 'South Goa',
    category: 'beach',
    categoryLabel: 'Beach',
    desc: 'A perfect crescent-shaped bay lined with swaying coconut palms, colourful beach huts and calm shallow waters.',
    color: '#001520',
    accent: '#2AB8A0',
    rating: 4.5,
    reviews: 145,
  },
  {
    id: 'varkala-beach',
    name: 'Varkala Beach',
    location: 'Thiruvananthapuram, Kerala',
    category: 'beach',
    categoryLabel: 'Beach',
    desc: 'Dramatic red laterite cliffs tower over the Arabian Sea, with natural spring water seeping through the cliff face.',
    color: '#1a0800',
    accent: '#E8954A',
    rating: 4.6,
    reviews: 167,
  },
  {
    id: 'marina-beach',
    name: 'Marina Beach',
    location: 'Chennai, Tamil Nadu',
    category: 'beach',
    categoryLabel: 'Beach',
    desc: 'The world\'s second longest urban beach stretching 13km along the Bay of Bengal — iconic sunrise destination.',
    color: '#000d1a',
    accent: '#4A90CC',
    rating: 4.3,
    reviews: 198,
  },
  {
    id: 'munnar',
    name: 'Munnar Tea Gardens',
    location: 'Idukki, Kerala',
    category: 'mountain',
    categoryLabel: 'Mountains & Nature',
    desc: 'Endless rolling hills blanketed in emerald tea plantations at 1,600m altitude — the green heart of Kerala.',
    color: '#0a1e00',
    accent: '#5EA832',
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 'rohtang-pass',
    name: 'Rohtang Pass',
    location: 'Manali, Himachal Pradesh',
    category: 'mountain',
    categoryLabel: 'Mountains & Nature',
    desc: 'A snow-covered Himalayan pass at 3,978m with panoramic views of glaciers, peaks and dramatic cloud formations.',
    color: '#0c1020',
    accent: '#7EB8E8',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    category: 'mountain',
    categoryLabel: 'Mountains & Nature',
    desc: 'A network of tranquil lagoons, lakes and canals — best experienced from a traditional wooden houseboat.',
    color: '#001208',
    accent: '#2AAA70',
    rating: 4.8,
    reviews: 243,
  },
  {
    id: 'dudhsagar-falls',
    name: 'Dudhsagar Falls',
    location: 'Sonaulim, Goa',
    category: 'mountain',
    categoryLabel: 'Mountains & Nature',
    desc: 'The "Sea of Milk" — one of India\'s tallest waterfalls at 310m, cascading through dense Western Ghats forest.',
    color: '#000e06',
    accent: '#4AC4A0',
    rating: 4.7,
    reviews: 156,
  },
]

const CATEGORIES = [
  { id: 'all',      label: 'All Places' },
  { id: 'landmark', label: 'City Landmarks' },
  { id: 'beach',    label: 'Beaches' },
  { id: 'mountain', label: 'Mountains & Nature' },
]

// star renderer helper
function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`star ${s <= Math.round(rating) ? 'star--filled' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="stars__num">{rating}</span>
    </div>
  )
}

function Destinations() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [sortBy,         setSortBy]         = useState('default')

  // useMemo recalculates ONLY when dependencies change
  // prevents unnecessary recalculation on every render
  const filtered = useMemo(() => {
    let result = [...ALL_DESTINATIONS]

    // 1. filter by category
    if (activeCategory !== 'all') {
      result = result.filter((d) => d.category === activeCategory)
    }

    // 2. filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.categoryLabel.toLowerCase().includes(q)
      )
    }

    // 3. sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviews - a.reviews)
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [activeCategory, searchQuery, sortBy])

  return (
    <motion.div
      className="destinations-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ── PAGE HEADER ── */}
      <div className="dest-header">
        <div className="dest-header__bg" />
        <div className="container">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Virtual Tours
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            All <em>Destinations</em>
          </motion.h1>
          <motion.p
            className="dest-header__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            12 iconic Indian destinations across 8 states —
            explore them all in immersive 360° VR.
          </motion.p>
        </div>
      </div>

      <div className="container">

        {/* ── SEARCH + SORT BAR ── */}
        <motion.div
          className="dest-controls"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Search input */}
          <div className="dest-search">
            {/* search icon */}
            <svg className="dest-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dest-search__input"
            />
            {/* clear button — only shows when typing */}
            {searchQuery && (
              <button
                className="dest-search__clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            className="dest-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="reviews">Sort: Most Reviewed</option>
            <option value="name">Sort: A → Z</option>
          </select>
        </motion.div>

        {/* ── CATEGORY FILTER PILLS ── */}
        <motion.div
          className="dest-filters"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`dest-filter ${activeCategory === cat.id ? 'dest-filter--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
              {/* show count badge */}
              <span className="dest-filter__count">
                {cat.id === 'all'
                  ? ALL_DESTINATIONS.length
                  : ALL_DESTINATIONS.filter((d) => d.category === cat.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── RESULTS COUNT ── */}
        <div className="dest-results-info">
          <span className="dest-results-count">
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
          </span>
          {searchQuery && (
            <span className="dest-results-query">
              for "{searchQuery}"
            </span>
          )}
        </div>

        {/* ── DESTINATIONS GRID ── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery + sortBy}
              className="dest-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  className="dest-card"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  layout
                >
                  {/* Color block top */}
                  <div
                    className="dest-card__img"
                    style={{ background: dest.color }}
                  >
                    <div
                      className="dest-card__glow"
                      style={{ background: dest.accent }}
                    />
                    {/* VR badge */}
                    <div className="dest-card__vr-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8z"/>
                        <circle cx="8.5" cy="12" r="1.5"/>
                        <circle cx="15.5" cy="12" r="1.5"/>
                      </svg>
                      360° VR
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="dest-card__body">
                    <div className="dest-card__top">
                      <span
                        className="dest-card__cat"
                        style={{ color: dest.accent }}
                      >
                        {dest.categoryLabel}
                      </span>
                      <Stars rating={dest.rating} />
                    </div>

                    <h3 className="dest-card__name">{dest.name}</h3>

                    <p className="dest-card__loc">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {dest.location}
                    </p>

                    <p className="dest-card__desc">{dest.desc}</p>

                    <div className="dest-card__footer">
                      <span className="dest-card__reviews">
                        {dest.reviews} reviews
                      </span>
                      <Link
                        to={`/destinations/${dest.id}`}
                        className="dest-card__btn"
                        style={{ '--accent': dest.accent }}
                      >
                        Enter VR
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            // ── EMPTY STATE ──
            <motion.div
              className="dest-empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="dest-empty__icon">◎</div>
              <h3>No destinations found</h3>
              <p>Try a different search term or category.</p>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                }}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}

export default Destinations
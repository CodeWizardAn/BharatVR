import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [dropOpen,  setDropOpen]  = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Explore',        path: '/destinations' },
    { label: 'City Landmarks', path: '/destinations?category=landmark' },
    { label: 'Beaches',        path: '/destinations?category=beach' },
    { label: 'Mountains',      path: '/destinations?category=mountain' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      <Link to="/" className="navbar__logo">
        Bharat<span>VR</span>
      </Link>

      <ul className="navbar__links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`navbar__link
                ${location.pathname === link.path
                  ? 'navbar__link--active' : ''}`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  className="navbar__link-indicator"
                  layoutId="nav-indicator"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        {user ? (
          // ── LOGGED IN ──
          <div className="navbar__user">
            <button
              className="navbar__user-btn"
              onClick={() => setDropOpen(!dropOpen)}
            >
              <div className="navbar__avatar">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="navbar__username">{user.name}</span>
              <svg
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: dropOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s'
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  className="navbar__dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  exit={{    opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{user.name}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>
                  <Link to="/profile" className="navbar__dropdown-item">
                    My Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="navbar__dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // ── LOGGED OUT ──
          <>
            <Link to="/login" className="navbar__login">
              Sign In
            </Link>
            <button
              className="btn btn-primary navbar__cta"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
          </>
        )}
      </div>

      <button
        className={`navbar__hamburger
          ${menuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={link.path} className="navbar__mobile-link">
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="navbar__mobile-actions">
              {user ? (
                <>
                  <Link to="/profile" className="btn btn-outline">
                    {user.name}
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"    className="btn btn-outline">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  )
}

export default Navbar
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Footer.css'

function Footer() {
  const destinations = [
    { label: 'Taj Mahal',        path: '/destinations/taj-mahal' },
    { label: 'Amber Fort',       path: '/destinations/amber-fort' },
    { label: 'Mysore Palace',    path: '/destinations/mysore-palace' },
    { label: 'Radhanagar Beach', path: '/destinations/radhanagar-beach' },
    { label: 'Munnar',           path: '/destinations/munnar' },
    { label: 'Rohtang Pass',     path: '/destinations/rohtang-pass' },
  ]

  const explore = [
    { label: 'All Destinations', path: '/destinations' },
    { label: 'City Landmarks',   path: '/destinations?category=landmark' },
    { label: 'Beaches',          path: '/destinations?category=beach' },
    { label: 'Mountains',        path: '/destinations?category=mountain' },
  ]

  const account = [
    { label: 'Sign In',    path: '/login' },
    { label: 'Register',   path: '/register' },
    { label: 'My Profile', path: '/profile' },
    { label: 'Admin Panel',path: '/admin' },
  ]

  return (
    <footer className="footer">

      {/* ── TOP DIVIDER LINE ── */}
      <div className="footer__divider" />

      <div className="footer__inner container">

        {/* ── LEFT: BRAND COLUMN ── */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            Bharat<span>VR</span>
          </Link>
          <p className="footer__tagline">
            Explore India's most iconic destinations
            through immersive 360° virtual reality —
            right from your browser.
          </p>

          {/* Social icons row */}
          <div className="footer__socials">
            {['GitHub', 'Instagram', 'Twitter'].map((s) => (
              <a
                key={s}
                href="#"
                className="footer__social-link"
                aria-label={s}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* ── MIDDLE: DESTINATIONS COLUMN ── */}
        <div className="footer__col">
          <h4 className="footer__col-title">Destinations</h4>
          <ul className="footer__list">
            {destinations.map((d) => (
              <li key={d.path}>
                <Link to={d.path} className="footer__link">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── MIDDLE: EXPLORE COLUMN ── */}
        <div className="footer__col">
          <h4 className="footer__col-title">Explore</h4>
          <ul className="footer__list">
            {explore.map((e) => (
              <li key={e.path}>
                <Link to={e.path} className="footer__link">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT: ACCOUNT COLUMN ── */}
        <div className="footer__col">
          <h4 className="footer__col-title">Account</h4>
          <ul className="footer__list">
            {account.map((a) => (
              <li key={a.path}>
                <Link to={a.path} className="footer__link">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © 2025 BharatVR. Built with React + A-Frame.js
          </p>
          <p className="footer__credits">
            A Web Development Mini Project
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
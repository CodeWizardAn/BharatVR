import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

// ── ANIMATION VARIANTS ──
// These are reusable animation configs for Framer Motion
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0  }
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } }
}

// ── DESTINATION DATA (temporary — will come from API later) ──
const destinations = [
  {
    id:       'taj-mahal',
    name:     'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    category: 'City Landmark',
    desc:     'The crown jewel of India. An ivory-white marble mausoleum on the bank of the Yamuna river.',
    color:    '#2d1a00',
    accent:   '#C9A84C',
  },
  {
    id:       'amber-fort',
    name:     'Amber Fort',
    location: 'Jaipur, Rajasthan',
    category: 'City Landmark',
    desc:     'A majestic hilltop fortress with ornate palaces, halls of mirrors and sweeping valley views.',
    color:    '#3d1500',
    accent:   '#D4845A',
  },
  {
    id:       'mysore-palace',
    name:     'Mysore Palace',
    location: 'Mysuru, Karnataka',
    category: 'City Landmark',
    desc:     'One of India\'s most visited monuments — illuminated by nearly 100,000 bulbs every Sunday.',
    color:    '#160024',
    accent:   '#A855D4',
  },
  {
    id:       'radhanagar-beach',
    name:     'Radhanagar Beach',
    location: 'Havelock Island, Andaman',
    category: 'Beach',
    desc:     'Asia\'s finest beach. Pristine white sand, crystal-clear water, and untouched rainforest.',
    color:    '#001a2d',
    accent:   '#3B9ECC',
  },
  {
    id:       'munnar',
    name:     'Munnar Tea Gardens',
    location: 'Idukki, Kerala',
    category: 'Mountains & Nature',
    desc:     'Endless rolling hills blanketed in emerald tea plantations stretching to the horizon.',
    color:    '#0a1e00',
    accent:   '#5EA832',
  },
  {
    id:       'rohtang-pass',
    name:     'Rohtang Pass',
    location: 'Manali, Himachal Pradesh',
    category: 'Mountains & Nature',
    desc:     'A snow-covered Himalayan pass at 3,978m with dramatic skies and breathtaking vistas.',
    color:    '#0c1020',
    accent:   '#7EB8E8',
  },
]

function Home() {
  const heroRef = useRef(null)

  // Parallax effect — hero content moves slightly as you scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ════════════════════════════════
              HERO SECTION
      ════════════════════════════════ */}
      <section className="hero">

        {/* Background glow orbs */}
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        {/* Hero text — has parallax applied via ref */}
        <div className="hero__content" ref={heroRef}>

          <motion.div
            className="home"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >

            {/* Eyebrow tag */}
            <motion.p
              className="eyebrow hero__eyebrow"
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Virtual Reality Tourism
            </motion.p>

            {/* Main heading */}
            <motion.h1
              className="hero__title"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Explore <em>India</em><br />
              Without Leaving<br />
              <strong>Your Home</strong>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="hero__sub"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Step inside 360° immersive experiences of India's
              most iconic destinations — from the Taj Mahal to
              the beaches of Andaman — powered by WebVR.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="hero__actions"
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/destinations" className="btn btn-primary">
                Start Exploring
              </Link>
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* Stats row at the bottom of hero */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { num: '12',    label: 'Destinations' },
            { num: '360°',  label: 'VR Experience' },
            { num: '8',     label: 'Indian States' },
            { num: '100%',  label: 'Free to Use' },
          ].map((stat) => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-num">{stat.num}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </motion.div>

      </section>

      {/* ════════════════════════════════
              MARQUEE STRIP
      ════════════════════════════════ */}
      <div className="marquee">
        <div className="marquee__track">
          {/* doubled so it loops seamlessly */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="marquee__inner">
              {['Taj Mahal','Amber Fort','Mysore Palace','Radhanagar Beach',
                'Munnar Tea Gardens','Rohtang Pass','Palolem Beach','Varkala',
                'Kerala Backwaters','Dudhsagar Falls','Hawa Mahal','Marina Beach'
              ].map((name) => (
                <span key={name} className="marquee__item">
                  <span className="marquee__dot" />
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
              FEATURED DESTINATIONS
      ════════════════════════════════ */}
      

      {/* ════════════════════════════════
              HOW IT WORKS
      ════════════════════════════════ */}
      <section className="how section">
        <div className="container">

          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              How It Works
            </span>
            <h2>Three Steps to <em>Anywhere</em></h2>
          </motion.div>

          <div className="how__steps">
            {[
              {
                num: '01',
                title: 'Choose a Destination',
                desc: 'Browse our curated collection of 12 iconic Indian destinations across 8 states.'
              },
              {
                num: '02',
                title: 'Enter the VR Scene',
                desc: 'Click Enter VR to load an immersive 360° panorama powered by A-Frame WebVR.'
              },
              {
                num: '03',
                title: 'Explore & Navigate',
                desc: 'Look around by dragging your mouse or tilting your phone. Click hotspots to move between scenes.'
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="how__step"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="how__num">{step.num}</span>
                <h3 className="how__title">{step.title}</h3>
                <p className="how__desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
              BOTTOM CTA BANNER
      ════════════════════════════════ */}
      <section className="cta-banner">
        <motion.div
          className="cta-banner__inner container"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>
            Ready to <em>Explore</em> India?
          </h2>
          <p>
            No passport. No tickets. No luggage.
            Just you and the most beautiful places in India.
          </p>
          <div className="cta-banner__actions">
            <Link to="/destinations" className="btn btn-primary">
              Start Your Journey
            </Link>
            <Link to="/register" className="btn btn-outline">
              Create Free Account
            </Link>
          </div>
        </motion.div>
      </section>

    </motion.div>
  )
}

export default Home
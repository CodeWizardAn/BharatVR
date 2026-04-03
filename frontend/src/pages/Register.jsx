import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Register.css'

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { score, label: 'Weak', color: '#e05' }
  if (score <= 3) return { score, label: 'Fair', color: '#E8954A' }
  if (score <= 4) return { score, label: 'Good', color: '#C9A84C' }
  return { score, label: 'Strong', color: '#5EA832' }
}

function Register() {
  const navigate = useNavigate()
  const { user, login } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const strength = getPasswordStrength(formData.password)

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) {
      e.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters'
    }
    if (!formData.email.trim()) {
      e.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = 'Enter a valid email address'
    }
    if (!formData.password) {
      e.password = 'Password is required'
    } else if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters'
    }
    if (!formData.confirmPassword) {
      e.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = 'Passwords do not match'
    }
    if (!formData.agreed) {
      e.agreed = 'You must agree to the terms'
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setServerError('')
    try {
      await new Promise((r) => setTimeout(r, 1000))
      login({
        name: formData.name,
        email: formData.email,
        role: 'user',
        token: 'fake-token-123',
      })
      navigate('/')
    } catch (err) {
      setServerError('Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-page__bg">
        <div className="auth-page__orb auth-page__orb--1" />
        <div className="auth-page__orb auth-page__orb--2" />
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" className="auth-card__logo">
          Bharat<span>VR</span>
        </Link>

        <div className="auth-card__header">
          <h2>Create account</h2>
          <p>Join thousands exploring India virtually</p>
        </div>

        {serverError && (
          <motion.div
            className="auth-error-banner"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {serverError}
          </motion.div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <label className="auth-label" htmlFor="name">
              Full Name
            </label>
            <div
              className={`auth-input-wrap ${
                errors.name ? 'auth-input-wrap--error' : ''
              }`}
            >
              <svg
                className="auth-input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <motion.span
                className="auth-field-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.name}
              </motion.span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-email">
              Email Address
            </label>
            <div
              className={`auth-input-wrap ${
                errors.email ? 'auth-input-wrap--error' : ''
              }`}
            >
              <svg
                className="auth-input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="reg-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <motion.span
                className="auth-field-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </motion.span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-password">
              Password
            </label>
            <div
              className={`auth-input-wrap ${
                errors.password ? 'auth-input-wrap--error' : ''
              }`}
            >
              <svg
                className="auth-input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                id="reg-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {formData.password && (
              <div className="strength-bar">
                <div className="strength-bar__track">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="strength-bar__segment"
                      style={{
                        background:
                          i <= strength.score
                            ? strength.color
                            : 'var(--smoke)',
                        transition: `background 0.3s ease ${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="strength-bar__label"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </span>
              </div>
            )}

            {errors.password && (
              <motion.span
                className="auth-field-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.password}
              </motion.span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div
              className={`auth-input-wrap ${
                errors.confirmPassword ? 'auth-input-wrap--error' : ''
              }`}
            >
              <svg
                className="auth-input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.span
                className="auth-field-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.confirmPassword}
              </motion.span>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="auth-checkbox__input"
              />
              <span className="auth-checkbox__box" />
              <span className="auth-checkbox__label">
                I agree to the{' '}
                <Link to="#" className="auth-switch__link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="auth-switch__link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreed && (
              <motion.span
                className="auth-field-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.agreed}
              </motion.span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18 }} />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch__link">
            Sign in
          </Link>
        </p>

      </motion.div>
    </motion.div>
  )
}

export default Register
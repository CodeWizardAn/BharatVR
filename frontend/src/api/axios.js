import axios from 'axios'

// ── CREATE AXIOS INSTANCE ──
// baseURL means every request automatically
// starts with http://localhost:5000/api
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── REQUEST INTERCEPTOR ──
// runs before EVERY request is sent
// automatically adds the JWT token to every request
api.interceptors.request.use(
  (config) => {
    // get token from localStorage
    const user = localStorage.getItem('user')
    if (user) {
      const parsed = JSON.parse(user)
      if (parsed.token) {
        // attach token to Authorization header
        config.headers.Authorization = `Bearer ${parsed.token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── RESPONSE INTERCEPTOR ──
// runs after EVERY response comes back
// handles token expiry globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if token expired or invalid — log user out
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
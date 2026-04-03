import api from './axios'

// get all destinations with optional filters
export const getDestinations = async (params = {}) => {
  const res = await api.get('/destinations', { params })
  return res.data
}

// get single destination by slug
export const getDestination = async (slug) => {
  const res = await api.get(`/destinations/${slug}`)
  return res.data
}

// create new destination (admin only)
export const createDestination = async (data) => {
  const res = await api.post('/destinations', data)
  return res.data
}

// update destination (admin only)
export const updateDestination = async (id, data) => {
  const res = await api.put(`/destinations/${id}`, data)
  return res.data
}

// delete destination (admin only)
export const deleteDestination = async (id) => {
  const res = await api.delete(`/destinations/${id}`)
  return res.data
}
import api from './axios'

export const getReviews = async (destinationId) => {
  const res = await api.get(`/reviews/${destinationId}`)
  return res.data
}

export const createReview = async (data) => {
  const res = await api.post('/reviews', data)
  return res.data
}

export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}`)
  return res.data
}
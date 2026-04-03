import api from './axios'

export const getFavourites = async () => {
  const res = await api.get('/users/favourites')
  return res.data
}

export const toggleFavourite = async (destinationId) => {
  const res = await api.post(`/users/favourites/${destinationId}`)
  return res.data
}

export const updateProfile = async (data) => {
  const res = await api.put('/users/profile', data)
  return res.data
}
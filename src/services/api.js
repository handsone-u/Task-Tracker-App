import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const login = async (email, password) => {
  const response = await apiClient.post('/v0/members/login', {
    id: email,
    password: password,
  })
  return response.data
}

export const register = async (email, password, username) => {
  const response = await apiClient.post('/v0/members/signup', {
    id: email,
    password: password,
    username: username,
  })
  return response.data
}

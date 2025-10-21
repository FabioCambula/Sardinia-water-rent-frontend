import axios from 'axios'
import { useAuthStore } from './stores/auth-stores'

// Crea un'istanza di Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor per aggiungere il token a ogni richiesta
api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor per gestire errori globali
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const auth = useAuthStore()
    //  401, logout automatico
    if (error.response?.status === 401) {
      auth.logout()
    }
    return Promise.reject(error)
  },
)

export default api

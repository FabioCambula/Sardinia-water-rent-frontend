import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: (() => {
      try {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : null
      } catch (e) {
        return null
      }
    })(),
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user && !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    setUser(user, token) {
      this.user = user
      this.token = token

      localStorage.setItem('user', JSON.stringify(user))
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})

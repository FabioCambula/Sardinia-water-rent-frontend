import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../axios'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const totalPrice = ref(0)
  const loading = ref(false)

  const getCart = async () => {
    loading.value = true
    try {
      const { data } = await api.get('/cart')
      items.value = data.products || []
      totalPrice.value = data.totalPrice || 0
    } catch (err) {
      console.error('Errore fetching cart:', err)
    } finally {
      loading.value = false
    }
  }

  const removeItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`)
      items.value = data.products || []
      totalPrice.value = data.totalPrice || 0
    } catch (err) {
      console.error('Errore rimuovendo item:', err)
    }
  }

  const addItem = async (productId, quantity = 1, startDate, endDate) => {
    try {
      const { data } = await api.post('/cart', {
        productId,
        quantity,
        startDate,
        endDate,
      })
      items.value = data.products || []
      totalPrice.value = data.totalPrice || 0
    } catch (err) {
      console.error('Errore aggiungendo item:', err)
    }
  }

  return { items, totalPrice, loading, getCart, removeItem, addItem }
})

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth-stores'

// Views principali
import Home from '../views/Home-views.vue'
import Dashboard from '../views/Dashboard-views.vue'
import Bookings from '@/views/Booking-views.vue'

// ✅ nuove view unificate
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },

  // ✅ elenco prodotti
  { path: '/products', name: 'Products', component: ProductList },

  // ✅ dettaglio dinamico del prodotto
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },

  {
    path: '/bookings',
    name: 'Bookings',
    component: Bookings,
    meta: { requiresAuth: true, role: 'user' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Guardia globale di accesso
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      return next('/')
    }
    if (to.meta.role && authStore.user.role !== to.meta.role) {
      return next('/')
    }
  }

  next()
})

export default router

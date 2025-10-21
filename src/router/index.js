import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth-stores'

import Home from '../views/Home-views.vue'
import Dashboard from '../views/Dashboard-views.vue'
import Products from '@/views/Products-views.vue'
import Bookings from '@/views/Booking-views.vue'
//products
import Kayak1 from '@/views/products/Kayak-1.vue'
import Kayak2 from '@/views/products/kayak-2.vue'
import Kayak3 from '@/views/products/kayak-3.vue'
import Mask from '@/views/products/mask.vue'
import Sup from '@/views/products/sup.vue'
import Surf from '@/views/products/surf.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/products/kayak-1', name: 'Kayak1', component: Kayak1 },
  { path: '/products/kayak-2', name: 'Kayak2', component: Kayak2 },
  { path: '/products/kayak-3', name: 'Kayak3', component: Kayak3 },
  { path: '/products/diving-mask', name: 'Mask', component: Mask },
  { path: '/products/sup', name: 'Sup', component: Sup },
  { path: '/products/surf', name: 'Surf', component: Surf },
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

// ✅ Guardia globale
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      // Non loggato → reindirizza a home
      return next('/')
    }
    if (to.meta.role && authStore.user.role !== to.meta.role) {
      // Ruolo non corretto → reindirizza a home
      return next('/')
    }
  }

  next()
})

export default router

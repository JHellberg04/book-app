import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import HomeView from '@/views/HomeView.vue'
import ReviewPage from '@/views/ReviewPage.vue'

// Create the router instance with history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public route: Home page
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Account-related routes (login, register, logout, admin)
    {
      path: '/account',
      component: () => import('@/views/AccountView.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/components/auth/LoginUser.vue'),
        },
        {
          path: 'register',
          component: () => import('@/components/auth/RegisterUser.vue'),
        },
        {
          path: 'logout',
          component: () => import('@/components/auth/LogoutUser.vue'),
          meta: { requiresAuth: true }, // Protected route: Only for logged in users
        },
        {
          path: 'admin/users',
          component: () => import('@/components/admin/AdminUsers.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }, // Admin only
        },
      ],
    },
    // Public route: Book list
    {
      path: '/bookshelf',
      component: () => import('@/views/BooksView.vue'),
    },
    // Placeholder view for /review (might be restructured)
    {
      path: '/review',
      component: () => import('@/views/ReviewView.vue'),
    },
    // Dynamic route for a specific book with reviews
    {
      path: '/book/:id',
      name: 'review',
      component: ReviewPage,
      props: true,
    },
  ],
  linkActiveClass: 'active',
})

// Navigation guard to protect routes based on login and admin status
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/account/login')
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return next('/account')
  }

  next()
})

export default router

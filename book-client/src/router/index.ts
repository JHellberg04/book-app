import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import HomeView from '@/views/HomeView.vue'

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
      name: 'bookshelf',
      component: () => import('@/views/BookshelfView.vue'),
    },
    // Route: Book review page for a specific book
    {
      path: '/bookshelf/bookreview/:id',
      name: 'book-review',
      component: () => import('@/views/BookReviewsView.vue'),
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

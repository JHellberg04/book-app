import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReviewPage from '../views/ReviewPage.vue'
import BookshelfView from '../views/BookshelfView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bookshelf/:id',
      name: 'review',
      component: ReviewPage,
      props: true,
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: BookshelfView,
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/RegisterView.vue'),
    // },
  ],
})

export default router

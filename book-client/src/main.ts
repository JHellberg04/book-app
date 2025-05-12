// Import global styles
import '@/scss/style.scss'

// Import Vue core and state management
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import root component and router
import App from '@/App.vue'
import router from '@/router'

// Import and initialize the authentication store
import { useAuthStore } from '@/stores/auth'

// Create the Vue application instance
const app = createApp(App)

// Create and use Pinia (state management)
const pinia = createPinia()
app.use(pinia)

// Use the Vue Router
app.use(router)

// Restore auth session from localStorage if token exists
const auth = useAuthStore()
auth.restoreSession()

// Mount the app to the DOM
app.mount('#app')

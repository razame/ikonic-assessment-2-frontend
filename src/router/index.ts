import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import FeedbackView from '../views/FeedbackView.vue'
import { useAuthStore } from '@/stores/auth'

const routesArray = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SigninView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }
    }
  ]
}

const router = createRouter(routesArray)

router.beforeEach((to, from, next) => {
  const currentRoute = to.path
  const token = useAuthStore().getToken

  // alert(currentRoute)
  const isGibberishPath = routesArray.routes.filter(route => {
    return currentRoute ===  route.path
  }).length === 0

  if(isGibberishPath){
    if (token) {
      // User is authenticated, proceed to the feedback
      next('/feedback')
    } else {
      // User is not authenticated, redirect to login
      next('/');
    }
  }


  if (to.meta.requiresAuth) {
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/');
    }
  }
  else {
    // Non-protected route, allow access
    next();
  }
});


export default router

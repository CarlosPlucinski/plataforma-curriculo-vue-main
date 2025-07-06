import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import About from '../components/AboutPage.vue';
import Register from '../components/RegisterPage.vue';
import Profile from '../components/ProfilePage.vue';
import ManageCurriculum from '../components/ManageCurriculum.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/curriculum', name: 'ManageCurriculum', component: ManageCurriculum, meta: { requiresAuth: true } },
  { path: '/login', component: () => import('@/components/LoginPage.vue') }
];


const router = createRouter({
  history: createWebHistory(), 
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router;

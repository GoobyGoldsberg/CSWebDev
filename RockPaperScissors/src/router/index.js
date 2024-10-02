import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/UserLogin.vue';
import Home from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../components/RockPaperScissorsGame.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

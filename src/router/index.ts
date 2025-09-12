import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { Blank, Default } from '@/components/layouts';
import LoginPage from '@/views/auth/LoginPage.vue';
import Index from '@/views/Index.vue';
import LandingPage from '@/views/LandingPage.vue';
import RegisterPage from '@/views/auth/RegisterPage.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: Index,
      },
    ],
  },
];

const authRouters = [
  {
    path: '/',
    component: Blank,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: LoginPage,
      },
      {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
      },
      {
        path: '/landing',
        name: 'Landing',
        component: LandingPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routers, ...authRouters],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken');

  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Landing' && !token) {
    next({ name: 'Landing' });
  } else if (to.name === 'Login' && token) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { Blank, Default } from '@/components/layouts';
import LoginPage from '@/views/auth/LoginPage.vue';
import Index from '@/views/Index.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routers, ...authRouters],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken');

  if (to.name !== 'Login' && !token) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && token) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

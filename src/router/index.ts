import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/Layouts/MainLayout.vue';
import AuthLayout from '@/components/Layouts/AuthLayout.vue';
import LoginPage from '@/views/Auth/LoginPage.vue';
import HomePage from '@/views/Home/HomePage.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    meta: {
      name: 'Home',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
    ],
  },
];

const authRouters = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
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

export default router;

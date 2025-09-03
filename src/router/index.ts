import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { Blank, Default } from '@/components/layouts';
import LoginPage from '@/views/auth/LoginPage.vue';
import HomePage from '@/views/home/HomePage.vue';
import GeneratePage from '@/views/generate/GeneratePage.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: Default,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/generate',
        name: 'Generate',
        component: GeneratePage,
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

export default router;

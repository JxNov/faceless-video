import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { Blank, Default } from '@/components/layouts';
import LoginPage from '@/views/auth/LoginPage.vue';
import HomePage from '@/views/home/HomePage.vue';
import GeneratePage from '@/views/generate/GeneratePage.vue';
import CronJobPage from '@/views/cron/CronJobPage.vue';
import CustomAvatarPage from '@/views/avatar/CustomAvatarPage.vue';

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
      {
        path: '/cron-job',
        name: 'CronJob',
        component: CronJobPage,
      },
      {
        path: '/custom-avatar',
        name: 'CustomAvatar',
        component: CustomAvatarPage,
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

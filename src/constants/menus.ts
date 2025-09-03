import type { NavMenu, NavMenuItems } from '@/types/nav';
import { Home, PlusIcon } from 'lucide-vue-next';

export const navMenu: NavMenu[] = [
  {
    heading: '',
    items: [
      {
        title: 'Home',
        icon: Home,
        link: '/',
      },
      {
        title: 'Generate',
        icon: PlusIcon,
        link: '/generate',
      },
    ],
  },
];

export const navMenuBottom: NavMenuItems = [];

import type { NavMenu, NavMenuItems } from '@/types/nav';
import { Home, PlusIcon, CalendarClock, Image } from 'lucide-vue-next';

export const navMenu: NavMenu[] = [
  {
    heading: '',
    items: [
      {
        title: 'Home',
        icon: Home,
        link: 'home',
      },
      {
        title: 'Generate',
        icon: PlusIcon,
        link: 'generate',
      },
      {
        title: 'Cron Job',
        icon: CalendarClock,
        link: 'cron-job',
      },
      {
        title: 'Custom Avatar',
        icon: Image,
        link: 'custom-avatar',
      },
    ],
  },
];

export const navMenuBottom: NavMenuItems = [];

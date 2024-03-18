import { SidebarLinkType } from '@/utils/types/sidebar.types';
import {
  BriefcaseBusiness as BriefcaseBusinessIcon,
  Calendar as CalenderIcon,
  LayoutDashboard as DashboardIcon,
  Mail as MailIcon,
  Newspaper as NewspaperIcon,
  PieChart as PieChartIcon,
  Users as UsersIcon,
} from 'lucide-react';

export const sidebarLinks: Record<string, SidebarLinkType[]> = {
  Menu: [
    { url: '/', title: 'Dashboard', icon: <DashboardIcon /> },
    { url: '/messages', title: 'Messages', icon: <MailIcon /> },
    { url: '/messages', title: 'Messages', icon: <CalenderIcon /> },
  ],
  Recruitment: [
    { url: '/jobs', title: 'Jobs', icon: <BriefcaseBusinessIcon /> },
    {
      url: '/applications',
      title: 'Applications',
      icon: <NewspaperIcon />,
    },
  ],
  Organization: [
    { url: '/employees', title: 'Employees', icon: <UsersIcon /> },
    { url: '/reports', title: 'Reports', icon: <PieChartIcon /> },
  ],
};
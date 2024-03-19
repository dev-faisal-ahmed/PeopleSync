import { SidebarLinkType } from '@/utils/types/sidebar.types';
import {
  BookCheck as BookCheckIcon,
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
    { url: '/', title: 'Dashboard', icon: <DashboardIcon size={20} /> },
    { url: '/messages', title: 'Messages', icon: <MailIcon size={20} /> },
    { url: '/calender', title: 'Calender', icon: <CalenderIcon size={20} /> },
  ],
  Recruitment: [
    { url: '/jobs', title: 'Jobs', icon: <BriefcaseBusinessIcon size={20} /> },
    {
      url: '/applications',
      title: 'Applications',
      icon: <NewspaperIcon size={20} />,
    },
  ],
  Organization: [
    { url: '/employees', title: 'Employees', icon: <UsersIcon size={20} /> },
    { url: '/reports', title: 'Reports', icon: <PieChartIcon size={20} /> },
  ],
  ForApplicants: [
    { url: '/apply', title: 'Apply', icon: <BookCheckIcon size={20} /> },
  ],
};

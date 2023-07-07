import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { ProfileIcon } from '@/components/icons/profile';
import ChangePassword from '@/pages/changeThePassword';

export const menuItems = [
  {
    name: 'Trang Chủ',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Hồ Sơ',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
];

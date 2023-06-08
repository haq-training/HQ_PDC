import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';

export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'NFT Details',
    icon: <DiskIcon />,
    href: routes.nftDetails,
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
];

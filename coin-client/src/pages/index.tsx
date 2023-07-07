import { useState,useEffect } from 'react';
import { NextPage } from 'next';
import LoginPage from '@/pages/auth/login';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import ModernScreen from '@/components/screens/modern-screen';
import MinimalScreen from '@/components/screens/minimal-screen';
import ClassicScreen from '@/components/screens/classic-screen';
import RetroScreen from '@/components/screens/retro-screen';
import { useRouter } from 'next/router';
import routes from '@/config/routes';


type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { layout } = useLayout();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(routes.login);
    } else {
      setIsLoggedIn(true);
    }
  }, []);


  if (!isLoggedIn) {
    return <LoginPage />;
  }

  let layoutContent = null;

  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    layoutContent = <MinimalScreen />;
  } else if (layout === LAYOUT_OPTIONS.CLASSIC) {
    layoutContent = <ClassicScreen />;
  } else if (layout === LAYOUT_OPTIONS.RETRO) {
    layoutContent = <RetroScreen />;
  } else {
    layoutContent = <ModernScreen />;
  }

  return <RootLayout>{layoutContent}</RootLayout>;
};

export default HomePage;

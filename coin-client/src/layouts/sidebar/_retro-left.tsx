import cn from 'classnames';
import Logo from '@/components/ui/logo';
import Image from '@/components/ui/image';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { Close } from '@/components/icons/close';
import { menuItems } from '@/layouts/sidebar/_menu-items';
//images
import jwt from 'jsonwebtoken';
import ShapeImage from '@/assets/images/sidebar-shape.png';
import Link from "next/link";
import routes from '@/config/routes';
import {useRouter} from 'next/router';
import axios from 'axios';
import Avatar from '@/components/ui/avatar';
import React, {useEffect, useState} from 'react';

export default function Sidebar({ className }: { className?: string }) {
  const { closeDrawer } = useDrawer();
  const router = useRouter();

  const [dataUser , setDataUser] = useState([]);
  const dataUsers  = React.useMemo(() => dataUser, [dataUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          const decodedToken = jwt.decode(token);
          const userId = decodedToken.idUser;
          const response = await axios.get(`http://localhost:4003/users/${userId}`, {
            headers: {
              token: `Bearer ${token}`
            },
            method: 'GET'
          });
          const user = await response.data;
          if (user) {
            setDataUser(user);
          }
          return user;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().catch((e) => {
      console.error('Loi: ', e);
    });
  }, []);


  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-5 2xl:px-8" onClick={() => router.push(routes.changeThePassword)}>
          <div className="flex items-center">
            {dataUsers.userAvarta && (
                <Avatar
                    image={dataUsers.userAvarta}
                    name="Cameron Williamson"
                    role="admin"
                    width={36}
                    height={36}
                />
            )}
            <h3 className="mt-3 ml-1 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              ĐỔI MẬT KHẨU
            </h3>
          </div>
          <div className="mt-12">
            {menuItems.map((item, index) => (
              <MenuItem
                key={`retro-left-${index}`}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
          <div className="relative mt-20 hidden flex-col rounded-lg bg-gray-200 p-6 dark:bg-[#333E59] lg:flex">
            <div className="-mt-12">
              <Image src={ShapeImage} alt="Shape image" width={200} />
            </div>
            <h2 className="mt-5 mb-7 text-center text-[20px] font-semibold leading-8 text-light-dark dark:text-white">
              Explore the new Blockchain System
            </h2>
            <button className="h-12 rounded-lg bg-brand text-white">
              Try Now{' '}
            </button>
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}

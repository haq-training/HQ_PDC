import cn from 'classnames';
import jwt from 'jsonwebtoken';
import Scrollbar from '@/components/ui/scrollbar';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import TransactCoin from '@/components/ui/transact-coin';
import WalletCard from '@/components/ui/wallet-card-two';
//images
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from "next/link";

export default function Sidebar({ className }: { className?: string }) {

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
        'top-0 z-20 h-full w-full max-w-full border-dashed border-slate-200 ltr:left-0 rtl:right-0 dark:border-gray-700 lg:fixed lg:w-80 ltr:lg:border-l rtl:lg:border-r xl:pt-20 3xl:w-[350px]',
        className
      )}
    >
      <div className="absolute top-0 right-0 z-20 h-[75px] w-full bg-sidebar-body dark:bg-dark md:block xl:hidden" />
      <Scrollbar style={{ height: 'calc(100% + 20px)' }}>
        <div className="relative z-20 pb-5">
          <div className="my-16 mx-5 flex h-full flex-col justify-between overflow-x-hidden rounded-lg bg-transparent sm:mx-6 sm:flex-row lg:mx-0 lg:flex-col lg:p-6 xl:my-0 2xl:p-8">
            <div className="w-full sm:w-[48%] lg:w-full">
              <Link href="/editUser">
                {dataUsers.userAvarta && (
                    <Avatar
                        image={dataUsers.userAvarta}
                        alt="admin"
                        className="mx-auto mb-6"
                        size="lg"
                        width={96}
                        height={96}
                    />
                )}

              </Link>
              <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                {dataUsers.userName}
              </h3>
              <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                $10,86,000
              </div>
              <TopupButton className="mb-8" />
              <div>
                <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />

                <TransactCoin className="mt-6 mb-8" />
              </div>
              <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
            </div>
            <div className="mt-10 w-full sm:mt-0 sm:w-[48%] lg:mt-8 lg:w-full">
              <WalletCard />
            </div>
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}

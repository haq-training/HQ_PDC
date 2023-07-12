import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Avatar from '@/components/ui/avatar';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TransactCoin from '@/components/ui/transact-coin';
import PriceFeedSlider from '@/components/ui/live-price-feed';
import Link from "next/link";
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
//images
import jwt from 'jsonwebtoken';

import axios from 'axios';
import routes from '@/config/routes';
import {useRouter} from 'next/router';

const topPoolsLimit = (breakpoint: string) => {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};

export default function MinimalScreen(){
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4003/coin/', {
          headers: {
            token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
          },
          method: 'GET'
        }).then((res) => {
          return res;
        });
        const dataCoin = await response?.data;
        if (dataCoin) {
          setData(dataCoin?.data);
        }
        return dataCoin;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData().catch((e) => {
      console.error('Loi: ', e);
    });
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

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

  const [limit, setLimit] = useState(4);
  const breakpoint = useBreakpoint();
  useEffect(() => {
    setLimit(topPoolsLimit(breakpoint));
  }, [breakpoint]);
  return (
    <>
      <NextSeo
        title="Criptic Minimal"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="">
        <PriceFeedSlider
          limit={4}
          priceFeeds={data}
          gridClassName="grid-cols-1 gap-6 2xl:grid-cols-4"
        />
        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto 2xl:col-span-3 2xl:h-full 2xl:p-6 3xl:col-span-3 3xl:p-8">
            <div className="w-full">
              <div className="mb-8 h-full"  onClick={() => router.push(routes.User)}>
                  {dataUsers.userAvarta && (
                      <Avatar
                          image={dataUsers.userAvarta}
                          alt="Author"
                          className="mx-auto mb-6"
                          size="lg"
                          width={96}
                          height={96}
                      />
                  )}
                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  {dataUsers.userName}
                </h3>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                  $10,86,000
                </div>
              </div>
              <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
              <TransactCoin className="mt-6" />
            </div>
          </div>

          <div className=" md:col-span-2 lg:col-span-12 lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:row-end-2 xl:col-start-4 xl:col-end-10 xl:row-start-1 xl:row-end-2 2xl:col-span-8 2xl:col-start-4 2xl:col-end-10 2xl:row-start-1 2xl:row-end-2 3xl:col-span-6 3xl:col-start-4 3xl:col-end-10 3xl:row-start-1 3xl:row-end-2">
            <TransactionTable />
          </div>

          <div className="md:col-span-2 lg:col-span-6 lg:row-start-2 lg:row-end-3 xl:col-start-10 xl:col-end-13 xl:row-start-1 xl:row-end-2 2xl:col-start-10 2xl:col-end-13 2xl:row-start-1 2xl:row-end-2 3xl:col-span-3 3xl:row-start-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <TopPools limit={limit} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

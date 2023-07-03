import { NextSeo } from 'next-seo';
import CoinSlider from '@/components/ui/coin-card-two';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import jwt from 'jsonwebtoken';
import TransactCoin from '@/components/ui/transact-coin';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
//images

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Link from "next/link";
import User from '@/pages/User';

export default function ClassicScreen() {
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
    <>
      <NextSeo
        title="Criptic Classic Demo"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
          <CoinSlider coins={data} />
        </div>
      </div>

      <div className="flex w-full flex-col sm:mt-8 lg:mt-8 lg:flex-row">
        <div className="flex w-full items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] lg:w-1/3 xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto xl:w-1/4 2xl:col-span-3  2xl:h-[715px] 2xl:p-6 3xl:col-span-3 3xl:h-[730px] 3xl:p-8 4xl:h-[815px]">
          <div className="w-full">
            <div className="mb-8 h-full">
                <Link href="/User">
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

                </Link>
              <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  {dataUsers.userName}
              </h3>
              <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                $10,86,000
              </div>

              <TopupButton className="md:h-12 " />
            </div>
            <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
            <TransactCoin className="mt-6" />
          </div>

        </div>
        <div className="mt-5 w-full rtl:mr-6 sm:mt-10 lg:ml-6 lg:mt-0 lg:w-2/3 rtl:lg:ml-0 xl:w-3/4 ">
            <TransactionTable />
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <TopPools />
        </div>
          <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)] ">
              <TopCurrencyTable />
          </div>
      </div>
    </>
  );
}

import cn from 'classnames';
import { NextSeo } from 'next-seo';
import CoinSlider from '@/components/ui/coin-card';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import Link from "next/link";
import jwt from 'jsonwebtoken';
//images
import AuthorImage from '@/assets/images/author.jpg';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import User from '@/pages/User';

export default function ModernScreen() {
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
        title="Criptic"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <CoinSlider coins={data} />
        </div>
        <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
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
            <TopupButton />
          </div>
        </div>
      </div>

      <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div>

      <div className="flex flex-wrap">
        <div
          className={cn(
            'w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]'
          )}
        >
          <TransactionTable />
        </div>
        <div
          className={cn(
            'order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]'
          )}
        >
          <TopPools />
        </div>
      </div>
    </>
  );
}

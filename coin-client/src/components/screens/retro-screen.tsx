import { NextSeo } from 'next-seo';
import TransactionTable from '@/components/transaction/transaction-table';

//images
import PriceFeedSlider from '@/components/ui/live-price-feed';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function RetroScreen() {
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
                const dataCoin = await response.data;
                if (dataCoin) {
                    setData(dataCoin.data);
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
  return (
    <>
      <NextSeo
        title="Criptic - Retro"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="retro-container">
        <div className="mt-7">
          <PriceFeedSlider
            priceFeeds={data}
            limit={3}
            gridClassName="2xl:grid-cols-3 2xl:gap-4"
          />
        </div>
        <div className="mt-7">
          <TransactionTable />
        </div>
      </div>
    </>
  );
}

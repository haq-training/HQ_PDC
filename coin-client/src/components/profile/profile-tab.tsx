import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import cn from 'classnames';
import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
// static data
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import routes from '@/config/routes';

const tabMenu = [
  {
    title: 'Collection',
    path: 'collection',
  },
  {
    title: 'Portfolio',
    path: 'portfolio',
  },
  {
    title: 'History',
    path: 'history',
  },
];

export default function ProfileTab() {
  const router = useRouter();
  const [dataCollection, setData] = useState<any>([]);
  const data = React.useMemo(() => dataCollection, [dataCollection]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          const decodedToken = jwt.decode(token);
          const userId = decodedToken.idUser;
          const response = await axios.get(`http://localhost:4003/collections/${userId}`, {
            headers: {
              token: `Bearer ${token}`
            },
            method: 'GET'
          });
          const collection = await response.data;
          if (collection.data) {
            setData(collection.data);
          }
          return collection.data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().catch((e) => {
      console.error('Loi: ', e);
    });
  }, []);

  const handleCollectionClick = (idCollection, idUser) => {
    router.push(`${routes.nftDetails}?idUser=${idUser}&idCollection=${idCollection}`);
  };

  const { layout } = useLayout();
  return (
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div
              className={cn(
                  'grid gap-4 xs:grid-cols-2 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
                  layout === LAYOUT_OPTIONS.RETRO
                      ? 'md:grid-cols-2'
                      : 'md:grid-cols-1'
              )}
          >
            {data.map((collection) =>  (
                  <CollectionCard
                      item={collection}
                      key={`collection-key-${collection?.idCollection}`}
                      idCollection={collection?.idCollection}
                      idUser={collection.idUser}
                      onClick={() => handleCollectionClick(collection.idCollection, collection.idUser)}

                  />
              )
            )}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 md:space-y-10 xl:space-y-12">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorWallets?.map((wallet) => (
                  <ListCard
                      item={wallet}
                      key={`wallet-key-${wallet?.id}`}
                      variant="medium"
                  />
              ))}
            </div>
            <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
                Protocols
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {authorProtocols?.map((protocol) => (
                    <ListCard
                        item={protocol}
                        key={`protocol-key-${protocol?.id}`}
                        variant="large"
                    />
                ))}
              </div>
            </div>
            <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
                Networks
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                {authorNetworks?.map((network) => (
                    <ListCard
                        item={network}
                        key={`network-key-${network?.id}`}
                        variant="medium"
                    />
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 xl:space-y-9">
            <TransactionSearchForm />
            <TransactionHistory />
          </div>
        </TabPanel>
      </ParamTab>
  );
}
import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import NftDetails from '@/components/nft/nft-details';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import MinimalNFTDetails from '@/components/nft/minimal-nft-details';
import RetroNFTDetails from '@/components/nft/retro-nft-details';
import ClassicNFTDetails from '@/components/nft/classic-nft-details';
import RootLayout from '@/layouts/_root-layout';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const NFTDetailsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {

  const router = useRouter();
  const { idCollection } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  const [dataId, setDataId] = useState<any>([]);
  const data = React.useMemo(() => dataId, [dataId]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4003/collections/${idCollection}/`, {
          headers: {
            token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
          },
          method: 'GET'
        }).then((res) => {
          return res;
        });
        const dataCollectionId = await response.data;
        if (dataCollectionId) {
          setDataId(dataCollectionId.data);
        }
        return dataCollectionId;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData().catch((e) => {
      console.error('Loi: ', e);
    });
  }, [idCollection]);

  const { layout } = useLayout();

  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalNFTDetails item={data} />;
  }

  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroNFTDetails  item={data} />;
  }

  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicNFTDetails  item={data}/>;
  }

  return (
    <>
      <NextSeo
        title="NFT details"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <NftDetails item={data} />
    </>
  );
};

NFTDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout contentClassName="!pb-0">{page}</RootLayout>;
};

export default NFTDetailsPage;

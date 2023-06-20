import Image from '@/components/ui/image';
import { ArrowUp } from '@/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StaticImageData } from 'next/image';
import cn from 'classnames';

type CoinCardProps = {
  id: string;
  full_name: string;
  name: string;
  image_url: string;
  internal: string;
  net_hashes_per_second: number;
  algorithm: string;
  max_supply: number;
  block_number:number;
  isBorder?: boolean;
};

export function CoinCard({
  full_name,
  name,
  net_hashes_per_second,
    isBorder,
    block_number
}: CoinCardProps) {
  return (
      <div
          className={cn(
              'flex items-center gap-4 rounded-lg bg-white p-5 dark:bg-light-dark lg:flex-row',
              {
                'light:border light:border-slate-200': !isBorder,
                'shadow-card': !isBorder,
              }
          )}
      >
        <div className="w-full flex-col">
          <div className="mb-3 flex items-center">
            <h4 className="text-sm font-medium text-gray-900 ltr:ml-3 rtl:mr-3 dark:text-white">
              {full_name}
            </h4>
          </div>

          <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
            {net_hashes_per_second}
            <span className="ml-3">{name}</span>
          </div>
          <div className="flex items-center text-xs font-medium 2xl:text-sm">
          <span
              className="truncate tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
          >
            {block_number} USD
          </span>
            <ArrowUp />
          </div>
        </div>

      </div>
  );
}

interface CoinSliderProps {
  coins: CoinCardProps[];
}

export default function CoinSlider({ coins }: CoinSliderProps) {
  const sliderBreakPoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1900: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        dir="ltr"
      >
        {coins.map((coin) => (
          <SwiperSlide key={coin.id}>
            <CoinCard
              id={coin.id}
              full_name={coin.full_name}
              name={coin.name}
              image_url={coin.image_url}
              internal={coin.internal}
              net_hashes_per_second={coin.net_hashes_per_second}
              algorithm={coin.algorithm}
              max_supply={coin.max_supply}
              block_number={coin.block_number}
              isBorder={coin.isBorder}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

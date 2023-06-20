import { ArrowUp } from '@/components/icons/arrow-up';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import cn from 'classnames';

type LivePriceFeedProps = {
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

export function LivePriceFeed({
  full_name,
  name,
  net_hashes_per_second,
  block_number,
  isBorder,
}: LivePriceFeedProps) {
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

interface PriceFeedSliderProps {
  limit: number;
  gridClassName: string;
  priceFeeds: LivePriceFeedProps[];
}

export default function PriceFeedSlider({
  limit,
  priceFeeds,
  gridClassName,
}: PriceFeedSliderProps) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 2.5,
      spaceBetween: 24,
    },
  };

  return isMounted &&
    ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].indexOf(breakpoint) !== -1 ? (
    <Swiper
      modules={[A11y]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={sliderBreakPoints}
      observer={true}
      dir="ltr"
    >
      {priceFeeds.map((item) => (
        <SwiperSlide key={item.id}>
          <LivePriceFeed {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className={cn('grid', gridClassName)}>
      {priceFeeds.slice(0, limit ?? 4).map((item) => (
        <LivePriceFeed key={item.id} {...item} />
      ))}
    </div>
  );
}
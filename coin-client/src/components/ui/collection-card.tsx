import Image from '@/components/ui/image';
import cn from 'classnames';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';

type ItemType = {
  idCollection: string | number;
  idUser: number;
  nameCollection: string;
  slug: string;
  title: string;
  coverImage: string;
  image: string;
  number_of_artwork: number;
  avatar: string;
  userName: string;
  userSlug: string;
};
type CardProps = {
  item: ItemType;
  className?: string;
  idCollection: string | number;
  idUser: string | number;
  onClick?: (id: string | number, idUser: string | number ) => void;
};

export default function CollectionCard({  item,
                                         className = '',
                                         idCollection,
                                         idUser,
                                         onClick, }: CardProps) {
  const { nameCollection, slug, title,coverImage, image, number_of_artwork,userName,userSlug } =
  item ?? {};

  const handleCardClick = () => {
    if (onClick) {
      onClick(idCollection,idUser);
    }
  };

  return (
      <div
          className={cn(
              'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
              className
          )}
          onClick={handleCardClick}
      >
        <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
          <Image
              src={coverImage}
              placeholder="empty"
              width={600}
              priority
              quality={100}
              height={600}
              alt={nameCollection}
          />
        </div>
        <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
          <AnchorLink
              href={slug}
              className="absolute top-0 left-0 z-10 h-full w-full"
          />
          <div className="flex justify-between gap-3">
            <div
                className="inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white
          backdrop-blur-[40px] "
            >
              {nameCollection}
            </div>
            {image && (
                <Image
                    src={image}
                    placeholder="empty"
                    width={60}
                    priority
                    quality={100}
                    height={60}
                    alt={nameCollection}
                />
            )}
          </div>
          <div className="block">
            <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
              {title}
            </h2>
            <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
              {number_of_artwork} Artworks
            </div>
            <AnchorLink
                href={userName}
                className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]"
            >
              <Avatar
                  //@ts-ignore
                  image={image}
                  alt={userSlug}
                  size="xs"
                  width={24}
                  height={24}
                  className="rounded-full"
              />
              <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
                @{userName}
              </div>
            </AnchorLink>
          </div>
        </div>
      </div>
  );
}
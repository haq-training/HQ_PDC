import React, {  useState  } from 'react';
import axios from 'axios';
import Image from '@/components/ui/image';
import cn from 'classnames';
import routes from '@/config/routes';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import { useRouter } from 'next/router';


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
  const { nameCollection, slug, avatar,title,coverImage, image, number_of_artwork,userName,userSlug } =
  item ?? {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick(idCollection,idUser);
    }
  };

  const handleEditClick = () => {
    router.push(`${routes.editCollection}?idUser=${idUser}&idCollection=${idCollection}`);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:4003/collections/delete/${idUser}/${idCollection}`, {
        headers: {
          token: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : null}`
        },
        method: 'DELETE'
      }).then((res) => {
        return res;
      });
    } catch (error) {
      console.error(error);
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
          <div
              className="absolute top-2 right-2 z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white hover:text-gray-300 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {isMenuOpen && (
                <div className="absolute right-0 z-20 mt-2 flex flex-col bg-white rounded-md shadow-lg">
                  <button
                      onClick={handleEditClick}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                      onClick={handleDeleteClick}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
            )}
          </div>
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
                  image={avatar}
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
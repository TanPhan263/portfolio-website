'use client';
import { IconDotsVertical, IconHeart, IconMessage2 } from '@tabler/icons-react';
import Image from 'next/image';

interface SocialCardProps {
  status: string;
  tags: string[];
  index: number;
  images: string[];
}

export const SocialCard = ({
  status,
  tags,
  index,
  images
}: SocialCardProps) => {
  return (
    <div className="shadow-md max-w-md border-0.75 relative flex h-fit flex-col justify-between gap-3 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 ">
          <Image
            src={'/images/avt.jpeg'}
            alt="thumbnail"
            objectFit="cover"
            width={60}
            height={60}
            className="border-gray-600 rounded-full overflow-hidden"
          />
          <div>
            <p className="dark:text-white font-semibold">Nathan Phan</p>
            <p className="text-black dark:text-white text-sm">
              Posted {index + 1} hours ago
            </p>
          </div>
        </div>
        <div className="text-black dark:text-white cursor-pointer">
          <button className="p-1">
            <IconDotsVertical />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-black dark:text-white">{status}</p>
        {tags.map((tag, index) => (
          <a className="text-blue-400" key={index}>
            #{tag}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2">
        {images.map((image, i) => (
          <div key={`${image}_${i}`}>
            <Image
              src={`/images/logo/${image}`}
              alt="thumbnail"
              objectFit="contain"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%', maxHeight: '100px' }}
            />
          </div>
        ))}
      </div>
      <hr className="bg-gray-950 dark:bg-white" />
      <div className="flex items-center justify-between text-black dark:text-white">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 p-1">
            <IconHeart />
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 p-1">
          <IconMessage2 />
          <span>3 Comment</span>
        </button>
      </div>
    </div>
  );
};

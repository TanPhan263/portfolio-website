"use client";
import { IHomeContent, ISocial } from "@/shared/services/home-service/dto";
import { cn, getCloudinaryUrl } from "@/shared/utils/common";
import {
  IconDotsVertical,
  IconHeartFilled,
  IconMessage2,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TechnicalMarquee } from "./technical-maquee";
import useHomePage from "@/shared/hooks/queries/useHomePage";

export const SocialCard = ({
  _id,
  text,
  tags,
  images,
  name,
  createdAt,
  likes,
}: ISocial) => {
  const [isClicked, setIsClicked] = useState(false);

  const { data, updateHomeContentMutation } = useHomePage();

  const handleLike = () => {
    const updatedLikes = isClicked ? likes - 1 : likes + 1;
    setIsClicked(!isClicked);
    const updatedSocials = [...(data?.socials || [])].map((social) => {
      if (social._id === _id) {
        return {
          ...social,
          likes: updatedLikes,
        };
      }
      return social;
    });

    updateHomeContentMutation.mutate({
      ...data,
      socials: updatedSocials,
    } as IHomeContent);
  };

  const imageList = useMemo(() => {
    return images.map((image) => getCloudinaryUrl(image));
  }, [images]);

  return (
    <div className="shadow-md max-w-md border-0.75 relative flex h-fit flex-col justify-between gap-2 md:gap-3 overflow-hidden rounded-xl p-3 md:p-4 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 ">
          <Image
            src={getCloudinaryUrl("avt")}
            alt="thumbnail"
            width={60}
            height={60}
            unoptimized
            className="border-gray-600 rounded-full overflow-hidden shrink-0"
          />
          <div>
            <p className="dark:text-white font-semibold line-clamp-1">{name}</p>
            <p className="text-black dark:text-white text-sm line-clamp-1">
              {createdAt}
            </p>
          </div>
        </div>
        <div className="text-black dark:text-white cursor-pointer">
          <button className="p-1">
            <IconDotsVertical />
          </button>
        </div>
      </div>

      <div>
        <p className="text-black dark:text-white">{text}</p>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <a
              className="text-blue-700 dark:text-blue-400 text-xs"
              key={tag + index}
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 min-h-40 auto-rows-[60px] md:auto-rows-[50px] lg:auto-rows-[90px] gap-0.5 rounded-sm overflow-hidden">
        <TechnicalMarquee
          className="col-span-full row-span-2"
          images={imageList}
        />
      </div>
      <hr className="bg-gray-950 dark:bg-gray-600" />
      <div className="flex items-center justify-between text-black dark:text-white">
        <div className="flex items-center space-x-2">
          <button className="flex justify-center items-center gap-2 px-2 p-1">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleLike()}
            >
              <IconHeartFilled
                className={cn(
                  {
                    "fill-pink-500 dark:fill-pink-700": isClicked,
                    "fill-white": !isClicked,
                  },
                  "transition-colors duration-300"
                )}
              />
            </motion.div>
            <span className="whitespace-nowrap">{likes || 0}</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 p-1">
          <IconMessage2 />
          <span className="whitespace-nowrap">Comment</span>
        </button>
      </div>
    </div>
  );
};

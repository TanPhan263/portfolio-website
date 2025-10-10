"use client";

import { BlogCardProps } from "@/types/blog";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./badge";

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const { id, title, imageUrl, tags = [] } = post;

  const href = `/blog/${id}`;

  // Create excerpt from content
  const displayExcerpt = post.content.slice(0, 150) + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link href={href} className="block">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300"
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            initial={false}
          />

          {/* Image section */}
          {imageUrl && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
              {/* Tags overlay */}
              {tags.length > 0 && (
                <motion.div
                  className="absolute top-4 left-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {tags.slice(0, 2).map((tag, tagIndex) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + tagIndex * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-xs"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Content section */}
          <div className="p-6 relative z-20">
            {/* Title */}
            <motion.h3
              className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {title}
            </motion.h3>

            {/* Excerpt */}
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {displayExcerpt}
            </motion.p>

            {/* Tags (if no image) */}
            {!imageUrl && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag, tagIndex) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + tagIndex * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

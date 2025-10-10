"use client";

import { FullScreen } from '@/components/full-screen';
import { motion } from 'motion/react';

export default function BlogPostLoading() {
  return (
    <FullScreen className="py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <motion.div
          className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Breadcrumb Skeleton */}
        <motion.div
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />

        {/* Header Section */}
        <div className="mb-8">
          {/* Tags Skeleton */}
          <motion.div
            className="flex gap-2 mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-18" />
          </motion.div>

          {/* Title Skeleton */}
          <motion.div
            className="space-y-3 mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </motion.div>

          {/* Meta Information Skeleton */}
          <motion.div
            className="flex gap-6 mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </motion.div>

          {/* Share Buttons Skeleton */}
          <motion.div
            className="flex gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </motion.div>
        </div>

        {/* Featured Image Skeleton */}
        <motion.div
          className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />

        {/* Content Skeleton */}
        <motion.div
          className="space-y-4 mb-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
                index % 3 === 2 ? 'w-3/4' : 'w-full'
              }`}
            />
          ))}
        </motion.div>

        {/* Related Posts Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <motion.div
            className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: 0.9 + index * 0.1 
                }}
              >
                <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
                <div className="p-6">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </FullScreen>
  );
}

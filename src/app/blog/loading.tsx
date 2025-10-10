"use client";

import { FullScreen } from '@/components/full-screen';
import { motion } from 'motion/react';

export default function BlogLoading() {
  return (
    <FullScreen className="py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <motion.div
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mx-auto mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-80 mx-auto"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: index * 0.1 
              }}
            >
              {/* Image Skeleton */}
              <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
              
              {/* Content Skeleton */}
              <div className="p-6">
                {/* Title */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                
                {/* Excerpt */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
                
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                </div>
                
                {/* Meta */}
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FullScreen>
  );
}

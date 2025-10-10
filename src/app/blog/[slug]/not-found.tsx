"use client";

import { FullScreen } from "@/components/full-screen";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function BlogPostNotFound() {
  return (
    <FullScreen className="flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* 404 Illustration */}
        <motion.div
          className="text-8xl mb-6"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          📝
        </motion.div>

        {/* Error Message */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Blog Post Not Found
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The blog post you`re looking for doesn`t exist or may have been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/blog">
            <Button className="flex items-center gap-2">
              <IconArrowLeft size={16} />
              Back to Blog
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <IconHome size={16} />
              Go Home
            </Button>
          </Link>
        </motion.div>

        {/* Suggestion */}
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Try browsing our latest blog posts or use the search feature to find
          what you`re looking for.
        </motion.p>
      </motion.div>
    </FullScreen>
  );
}

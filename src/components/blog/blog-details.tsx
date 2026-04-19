'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButtons } from '@/components/ui/share-buttons';
import { useBlogPost } from '@/shared/hooks/queries/useBlog';
import { IconArrowLeft } from '@tabler/icons-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppImage from '../ui/app-image';

interface BlogDetailsProps {
  index: number | string;
}

// Loading component
const BlogDetailsLoading = () => (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-8" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8" />
      <div className="space-y-3 mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  </div>
);

export const BlogDetails = ({ index }: BlogDetailsProps) => {
  const { data, isLoading, isError } = useBlogPost(index);

  if (isLoading) {
    return <BlogDetailsLoading />;
  }

  console.log(data);

  if (isError || !data) {
    notFound();
  }

  const { title, content, imageUrl, tags = [] } = data;

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link href="/blog">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <IconArrowLeft size={16} />
            Back to Blog
          </Button>
        </Link>
      </motion.div>

      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
      >
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/blog"
          className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate">{title}</span>
      </motion.nav>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        {/* Tags */}
        {tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Badge variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ShareButtons
            url={currentUrl}
            title={title}
            description={content.slice(0, 150) + '...'}
          />
        </motion.div>
      </motion.header>

      {/* Featured Image */}
      {imageUrl && (
        <motion.div
          className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <AppImage
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </motion.div>
      )}

      {/* Article Content */}
      <motion.article
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div
          className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.article>

      {/* Related Posts */}
      {/* {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost, index) => (
              <BlogCard
                key={index}
                post={{
                  id: index,
                  title: relatedPost.title,
                  content: relatedPost.content,
                  imageUrl: relatedPost.imageUrl,
                  tags: relatedPost.tags,
                }}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      )} */}
    </div>
  );
};

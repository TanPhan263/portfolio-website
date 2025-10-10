"use client";

import { motion } from "motion/react";
import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useBlogPosts } from "@/shared/hooks/queries/useBlog";
import { IBlogQueryParams } from "@/shared/services/blog-service/dto";

interface BlogListingProps {
  initialParams?: IBlogQueryParams;
}

export const BlogListing = ({ initialParams }: BlogListingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);

  // Prepare query parameters
  const queryParams: IBlogQueryParams = {
    page: currentPage,
    limit: 9,
    search: searchTerm || undefined,
    sortBy: "title",
    sortOrder: "desc",
    ...initialParams,
  };

  const { posts, isLoading, isError } = useBlogPosts(queryParams);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Blog
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Thoughts, insights, and stories about web development, design, and
          technology.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="relative max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <IconSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Error State */}
      {isError && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Posts
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            There was an error loading the blog posts. Please try again later.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </motion.div>
      )}

      {/* Posts Grid */}
      {!isLoading && !isError && posts.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              post={{
                id: post._id,
                title: post.title,
                content: post.content,
                imageUrl: post.imageUrl,
                tags: post.tags,
              }}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && posts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {searchTerm
              ? `No posts match "${searchTerm}". Try a different search term.`
              : "No blog posts available at the moment."}
          </p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => handleSearch("")}
              className="mt-4"
            >
              Clear search
            </Button>
          )}
        </motion.div>
      )}

      {/* Pagination */}
      {/* {totalPages > 1 && !searchTerm && (
        <motion.div
          className="flex justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className="flex items-center gap-2"
          >
            <IconChevronLeft size={16} />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-lg font-medium transition-all duration-300",
                  page === currentPage
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="flex items-center gap-2"
          >
            Next
            <IconChevronRight size={16} />
          </Button>
        </motion.div>
      )} */}
    </div>
  );
};

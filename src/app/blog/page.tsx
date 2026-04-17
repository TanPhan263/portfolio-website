import { FullScreen } from "@/components/full-screen";
import { BlogListing } from "@/components/blog/blog-listing";
import getQueryClient from "@/shared/query-client";
import BlogService from "@/shared/services/blog-service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Blog | Nathan Phan",
  description:
    "Thoughts, insights, and stories about web development, design, and technology by Nathan Phan.",
  openGraph: {
    title: "Blog | Nathan Phan",
    description:
      "Read the latest articles about React, Next.js, TypeScript, and modern web development.",
    url: "https://tanteck.net/blog",
    siteName: "Nathan Phan",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Nathan Phan",
    description:
      "Discover insights and tutorials about modern web development from Nathan Phan.",
  },
  alternates: {
    canonical: "https://tanteck.net/blog",
  },
};

export default async function BlogPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blog-posts"],
    queryFn: () => BlogService.getBlogPosts(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FullScreen className="py-12">
        <BlogListing />
      </FullScreen>
    </HydrationBoundary>
  );
}

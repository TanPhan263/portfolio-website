import { FullScreen } from "@/components/full-screen";
import { BlogDetails } from "@/components/blog/blog-details";

import { Metadata } from "next";
import getQueryClient from "@/shared/query-client";
import BlogService from "@/shared/services/blog-service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface BlogPostPageProps {
  params: Promise<{
    slug: string; // This will be the index as a string
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const response = await BlogService.getBlogPosts();
    if (!response?.length) return [];

    return response.map((_, index) => ({
      slug: index.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await BlogService.getBlogPostById(slug);
    const post = response;

    if (!post) {
      return {
        title: "Post Not Found | Nathan Phan",
        description: "The requested blog post could not be found.",
      };
    }

    const description =
      post.content.replace(/<[^>]*>/g, "").slice(0, 160) + "...";

    return {
      title: `${post.title} | Nathan Phan`,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `https://nathan-phan.vercel.app/blog/${slug}`,
        siteName: "Nathan Phan",
        images: post.imageUrl
          ? [
              {
                url: post.imageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
        type: "article",
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: post.imageUrl ? [post.imageUrl] : undefined,
      },
      alternates: {
        canonical: `https://nathan-phan.vercel.app/blog/${slug}`,
      },
      keywords: post.tags?.join(", "),
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post Not Found | Nathan Phan",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const queryClient = getQueryClient();
  const { slug } = await params;

  // Prefetch the blog post data
  await queryClient.prefetchQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => BlogService.getBlogPostById(slug),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FullScreen className="py-12">
        <BlogDetails index={slug} />
      </FullScreen>
    </HydrationBoundary>
  );
}

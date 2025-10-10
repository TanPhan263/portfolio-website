import BlogService from '@/shared/services/blog-service';
import {
  IBlogPost,
  IBlogQueryParams,
  IRelatedPostsParams
} from '@/shared/services/blog-service/dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Hook for fetching all blog posts
export const useBlogPosts = (params?: IBlogQueryParams) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blog-posts', params],
    queryFn: () => BlogService.getBlogPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  return {
    data,
    posts: data || [],
    isLoading,
    isError,
    refetch
  };
};

// Hook for fetching a single blog post by index
export const useBlogPost = (id: number | string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => BlogService.getBlogPostById(id),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
};

// Hook for fetching related posts
export const useRelatedPosts = (params: IRelatedPostsParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['related-posts', params.postIndex, params.tags],
    queryFn: () => BlogService.getRelatedPosts(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    enabled: params.postIndex >= 0 && params.tags.length > 0
  });

  return {
    data: data || [],
    isLoading,
    isError
  };
};

// Hook for creating a new blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: IBlogPost) =>
      BlogService.createBlogPost(payload),
    onSuccess: () => {
      // Invalidate and refetch blog posts
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
    onError: (err) => {
      console.log('Create Blog Post Error', err);
    }
  });

  return mutation;
};

// Hook for updating a blog post
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ index, payload }: { index: number; payload: Partial<IBlogPost> }) =>
      BlogService.updateBlogPost(index, payload),
    onSuccess: (data, variables) => {
      // Invalidate and refetch blog posts
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      // Update the specific blog post cache
      queryClient.invalidateQueries({ queryKey: ['blog-post', variables.index] });
    },
    onError: (err) => {
      console.log('Update Blog Post Error', err);
    }
  });

  return mutation;
};

// Hook for deleting a blog post
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (index: number) => BlogService.deleteBlogPost(index),
    onSuccess: () => {
      // Invalidate and refetch blog posts
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
    onError: (err) => {
      console.log('Delete Blog Post Error', err);
    }
  });

  return mutation;
};

// Main hook that combines common blog functionality
const useBlog = () => {
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  return {
    createBlogPost: createMutation,
    updateBlogPost: updateMutation,
    deleteBlogPost: deleteMutation
  };
};

export default useBlog;

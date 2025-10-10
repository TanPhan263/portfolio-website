export interface BlogPost {
  id: number | string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

export interface BlogListingProps {
  posts: BlogPost[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export interface BlogDetailsProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
}

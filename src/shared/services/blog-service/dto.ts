export interface IBlogPost {
  _id: number | string;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

export interface IBlogListResponse {
  posts: IBlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IBlogPostResponse {
  post: IBlogPost;
  relatedPosts?: IBlogPost[];
}

export interface IBlogQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  sortBy?: 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface IRelatedPostsParams {
  postIndex: number;
  tags: string[];
  limit?: number;
}

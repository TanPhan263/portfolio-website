import { BaseService } from '@/shared/services';
import END_POINTS from '../end-points';
import {
  IBlogPost,
  IRelatedPostsParams
} from './dto';

class BlogService extends BaseService {
  constructor() {
    super();
  }

  getBlogPosts = async (): Promise<IBlogPost[] | null> => {
    try {
      const res = await this.get<null, IBlogPost[]>(
        END_POINTS.BLOG,
        null
      );

      return res;
    } catch (err) {
      console.log('Get Blog Posts Error', err);
      return null;
    }
  };

  getBlogPostById = async (id: number | string): Promise<IBlogPost | null> => {
    try {
      const endpoint = END_POINTS.BLOG_DETAILS.replace('{id}', `${id}`);
      const res = await this.get<null, IBlogPost>(endpoint, null);
      return res;
    } catch (err) {
      console.log('Get Blog Post Error', err);
      return null;
    }
  };

  getRelatedPosts = async (params: IRelatedPostsParams): Promise<IBlogPost[] | null> => {
    try {
      const res = await this.get<IRelatedPostsParams, IBlogPost[]>(
        `${END_POINTS.BLOG}/related`,
        params
      );
      return res;
    } catch (err) {
      console.log('Get Related Posts Error', err);
      return null;
    }
  };

  createBlogPost = async (payload: IBlogPost): Promise<IBlogPost | null> => {
    try {
      const res = await this.post<IBlogPost, IBlogPost>(
        END_POINTS.BLOG,
        payload
      );
      return res;
    } catch (err) {
      console.log('Create Blog Post Error', err);
      return null;
    }
  };

  updateBlogPost = async (index: number, payload: Partial<IBlogPost>): Promise<IBlogPost | null> => {
    try {
      const res = await this.patch<Partial<IBlogPost>, IBlogPost>(
        `${END_POINTS.BLOG}/${index}`,
        payload
      );
      return res;
    } catch (err) {
      console.log('Update Blog Post Error', err);
      return null;
    }
  };

  deleteBlogPost = async (index: number): Promise<boolean> => {
    try {
      await this.delete(`${END_POINTS.BLOG}/${index}`);
      return true;
    } catch (err) {
      console.log('Delete Blog Post Error', err);
      return false;
    }
  };
}

export default new BlogService();

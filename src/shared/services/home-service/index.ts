import { BaseService } from '@/shared/services';
import END_POINTS from '../end-points';
import { IHomeContent } from './dto';

class HomeService extends BaseService {
  constructor() {
    super();
  }

  getHomeContent = async (): Promise<IHomeContent | null> => {
    try {
      const res = await this.get<null, IHomeContent[]>(END_POINTS.HOME, null);

      return res?.[0];
    } catch (err) {
      console.log('Get Home Content Error', err);
      return null;
    }
  };

  updateHomeContent = async (payload: IHomeContent): Promise<IHomeContent | null> => {
    try {
      const res = await this.patch<IHomeContent, IHomeContent>(`${END_POINTS.HOME}/${payload?._id}`, payload);

      return res;
    } catch (err) {
      console.log('Get Home Content Error', err);
      return null;
    }
  };
}

export default new HomeService();

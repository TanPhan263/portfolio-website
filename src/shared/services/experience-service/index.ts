import { BaseService } from '@/shared/services';
import END_POINTS from '../end-points';
import { IExperience } from './dto';

class ExperienceService extends BaseService {
  constructor() {
    super();
  }

  getExperienceContent = async (): Promise<IExperience[] | null> => {
    try {
      const res = await this.get<null, IExperience[]>(
        END_POINTS.EXPERIENCE,
        null
      );
      return res;
    } catch (err) {
      console.log('Get Experience Content Error', err);
      return null;
    }
  };
}

export default new ExperienceService();

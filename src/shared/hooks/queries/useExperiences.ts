import ExperienceService from '@/shared/services/experience-service';
import { useQuery } from '@tanstack/react-query';

const useExperiencePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['experience-page'],
    queryFn: () => ExperienceService.getExperienceContent(),
    staleTime: 5 * 60 * 1000
  });

  return {
    data,
    isLoading,
    isError
  };
};

export default useExperiencePage;

import HomeService from '@/shared/services/home-service';
import { useQuery } from '@tanstack/react-query';

const useHomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-page'],
    queryFn: () => HomeService.getHomeContent(),
    staleTime: 5 * 60 * 1000
  });

  return {
    data,
    isLoading,
    isError
  };
};

export default useHomePage;

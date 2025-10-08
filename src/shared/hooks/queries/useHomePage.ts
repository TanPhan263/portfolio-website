import HomeService from '@/shared/services/home-service';
import { IHomeContent } from '@/shared/services/home-service/dto';
import { useMutation, useQuery } from '@tanstack/react-query';

const useHomePage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['home-page'],
    queryFn: () => HomeService.getHomeContent(),
    staleTime: 5 * 60 * 1000
  });

  const updateHomeContentMutation = useMutation({
    mutationFn: (payload: IHomeContent) => HomeService.updateHomeContent(payload),
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log('Update Home Content Error', err);
    }
  });

  return {
    data,
    isLoading,
    isError,
    updateHomeContentMutation
  };
};

export default useHomePage;

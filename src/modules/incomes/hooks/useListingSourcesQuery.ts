import { useQuery } from '@tanstack/react-query';
import { getSourcesService } from '../services/getSources/getSources.service';

const useListingSourcesQuery = () => {
  return useQuery({
    queryKey: ['listing-sources'],
    queryFn: async () => getSourcesService.execute(),
    initialData: []
  });
};

export { useListingSourcesQuery };

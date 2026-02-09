import { useQuery } from '@tanstack/react-query';
import { getIncomesService } from '../../services/getIncomes/getIncomes.service';
import {
  GetIncomesOutputDto,
  GetIncomesIntputDto,
} from '../../services/getIncomes/getIncomes.dto';

const useListingIncomesQuery = ({
  page = 1,
  size = 10,
}: GetIncomesIntputDto) => {
  return useQuery<GetIncomesOutputDto>({
    queryKey: ['listing-income', page, size],
    queryFn: async () => getIncomesService.execute({ page, size }),
  });
};

export { useListingIncomesQuery };

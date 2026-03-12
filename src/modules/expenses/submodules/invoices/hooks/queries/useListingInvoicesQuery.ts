import { useQuery } from '@tanstack/react-query';
import { getInvoicesService } from '../../services/getInvoices/getInvoices.service';
import { GetInvoicesInputDto, GetInvoicesOutputDto } from '../../services/getInvoices/getInvoices.dto';

const useListingInvoicesQuery = (params: GetInvoicesInputDto) => {
  return useQuery<GetInvoicesOutputDto>({
    queryKey: ['listing-invoices', params],
    queryFn: () => getInvoicesService.execute(params),
  });
};

export { useListingInvoicesQuery };

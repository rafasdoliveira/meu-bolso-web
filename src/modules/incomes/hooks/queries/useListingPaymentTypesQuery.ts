import { useQuery } from '@tanstack/react-query';
import { getPaymentTypesService } from '../../services/getPaymentTypes/getPaymentTypes.service';

const useListingPaymentTypesQuery = () => {
  return useQuery({
    queryKey: ['listing-payment-types'],
    queryFn: async () => getPaymentTypesService.execute(),
    initialData: []
  });
};

export { useListingPaymentTypesQuery };

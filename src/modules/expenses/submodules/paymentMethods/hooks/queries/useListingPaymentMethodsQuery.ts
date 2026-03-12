import { useQuery } from '@tanstack/react-query';
import { getPaymentMethodsService } from '../../services/getPaymentMethods/getPaymentMethods.service';
import { GetPaymentMethodsOutputDto } from '../../services/getPaymentMethods/getPaymentMethods.dto';

const useListingPaymentMethodsQuery = () => {
  return useQuery<GetPaymentMethodsOutputDto>({
    queryKey: ['listing-payment-methods'],
    queryFn: () => getPaymentMethodsService.execute(1),
    initialData: [],
  });
};

export { useListingPaymentMethodsQuery };

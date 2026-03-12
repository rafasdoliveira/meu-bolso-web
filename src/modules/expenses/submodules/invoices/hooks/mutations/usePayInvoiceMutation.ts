import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchInvoicePaymentService } from '../../services/patchInvoicePayment/patchInvoicePayment.service';
import { PayInvoiceInputDto } from '../../services/patchInvoicePayment/patchInvoicePayment.dto';

const usePayInvoiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PayInvoiceInputDto) =>
      patchInvoicePaymentService.execute(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-invoices'] });
    },
  });
};

export { usePayInvoiceMutation };

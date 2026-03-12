import { ModuleHeader } from '@components/moduleHeader';
import { ExpensesLayout } from '../../../components/layout';
import { DialogCreatePaymentMethod } from '../components/dialogCreatePaymentMethod';
import { ListPaymentMethods } from '../components/listPaymentMethods';

function PaymentMethods() {
  return (
    <ExpensesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Métodos de Pagamento'
          subtitle='Gerencie seus cartões e meios de pagamento.'
        />
        <DialogCreatePaymentMethod />
      </div>
      <div className='mt-6'>
        <ListPaymentMethods />
      </div>
    </ExpensesLayout>
  );
}

export { PaymentMethods };

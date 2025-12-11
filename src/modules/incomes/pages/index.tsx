import { ModuleHeader } from '@components/moduleHeader';
import { DialogCreateIncome } from '../components/dialogCreateIncome';
import { IncomesLayout } from '../components/layout';
import { ListIncomesDataTable } from '../components/listIncomesDataTable';

function ReceitasPage() {
  return (
    <IncomesLayout>
      <div className='mb-2 flex items-center justify-between'>
        <ModuleHeader
          title='Receitas'
          subtitle='Acompanhe e organize todas as suas receitas de forma prática.'
        />
        <DialogCreateIncome />
      </div>
      <ListIncomesDataTable />
    </IncomesLayout>
  );
}

export { ReceitasPage };

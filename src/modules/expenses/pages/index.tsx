import { ModuleHeader } from '@components/moduleHeader';
import { DialogCreateExpense } from '../components/dialogCreateExpense';
import { ExpensesLayout } from '../components/layout';
import { ListExpensesDataTable } from '../components/listExpensesDataTable';

function Expenses() {
  return (
    <ExpensesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Despesas'
          subtitle='Acompanhe e organize todas as suas despesas de forma prática.'
        />
      </div>
      <div className='flex items-center justify-end gap-2 py-4'>
        <DialogCreateExpense />
      </div>
      <ListExpensesDataTable />
    </ExpensesLayout>
  );
}

export { Expenses };

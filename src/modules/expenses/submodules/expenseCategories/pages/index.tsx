import { ModuleHeader } from '@components/moduleHeader';
import { ExpensesLayout } from '../../../components/layout';
import { DialogCreateExpenseCategory } from '../components/dialogCreateExpenseCategory';
import { ListExpenseCategories } from '../components/listExpenseCategories';

function ExpenseCategories() {
  return (
    <ExpensesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Categorias de Despesa'
          subtitle='Visualize todas as categorias e subcategorias disponíveis.'
        />
        <DialogCreateExpenseCategory />
      </div>
      <div className='mt-6'>
        <ListExpenseCategories />
      </div>
    </ExpensesLayout>
  );
}

export { ExpenseCategories };

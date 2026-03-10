import { DataTable } from '@components/datatable';
import { ActionButton } from '@shared/types/actionButtonType';
import { usePagination } from '@shared/hooks/usePagination';
import { Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@shared/types/expense';
import { tableColumnsExpenses } from '../tableColumnsExpenses';
import { useListingExpensesQuery } from '../../hooks/queries/useListingExpensesQuery';
import { useDeleteExpenseMutation } from '../../hooks/mutations/useDeleteExpenseMutation';
import { toast } from 'sonner';

function ListExpensesDataTable() {
  const pagination = usePagination();
  const { data: listingExpenses, isLoading } = useListingExpensesQuery({
    page: pagination.pageInfo.value.page,
    size: pagination.pageInfo.value.perPage,
  });

  const { mutate: deleteExpense } = useDeleteExpenseMutation();

  const actionsExpenses: ActionButton[] = [
    {
      label: 'Editar Despesa',
      icon: <Pencil />,
      onClick: (row: Expense) => {
        console.log(row);
      },
    },
    {
      label: 'Excluir Despesa',
      icon: <Trash2 />,
      onClick: (row: Expense) => {
        deleteExpense(
          { id: row.id },
          { onSuccess: () => toast.success('Despesa excluída com sucesso!') },
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        actionButtons={actionsExpenses}
        columns={tableColumnsExpenses}
        data={listingExpenses?.data || []}
        isLoading={isLoading}
        pageInfo={{
          page: pagination.pageInfo.value.page,
          perPage: pagination.pageInfo.value.perPage,
          total: listingExpenses?.total || 0,
        }}
        handleSelectPerPage={pagination.handleSelectPerPage}
        handlePreviousPage={pagination.handlePreviousPage}
        handleNextPage={pagination.handleNextPage}
      />
    </div>
  );
}

export { ListExpensesDataTable };

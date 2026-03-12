import { useState } from 'react';
import { DataTable } from '@components/datatable';
import { ActionButton } from '@shared/types/actionButtonType';
import { usePagination } from '@shared/hooks/usePagination';
import { CheckCircle, Clock, Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@shared/types/expense';
import { tableColumnsExpenses } from '../tableColumnsExpenses';
import { DialogConfirmDeleteExpense } from '../dialogConfirmDeleteExpense';
import { DialogEditExpense } from '../dialogEditExpense';
import { useListingExpensesQuery } from '../../hooks/queries/useListingExpensesQuery';
import { useDeleteExpenseMutation } from '../../hooks/mutations/useDeleteExpenseMutation';
import { useUpdateExpenseStatusMutation } from '../../hooks/mutations/useUpdateExpenseStatusMutation';
import { toast } from 'sonner';

type Props = {
  readonly month?: number;
  readonly year?: number;
  readonly invoice_month?: number;
  readonly invoice_year?: number;
  readonly search?: string;
  readonly paymentMethodId?: number;
};

function ListExpensesDataTable({ month, year, invoice_month, invoice_year, search, paymentMethodId }: Props) {
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const pagination = usePagination();
  const { data: listingExpenses, isLoading } = useListingExpensesQuery({
    page: pagination.pageInfo.value.page,
    size: pagination.pageInfo.value.perPage,
    month,
    year,
    invoice_month,
    invoice_year,
    search: search || undefined,
    payment_method_id: paymentMethodId || undefined,
  });

  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpenseMutation();
  const { mutate: updateStatus } = useUpdateExpenseStatusMutation();

  const handleDelete = (deleteAll: boolean) => {
    if (!expenseToDelete) return;
    deleteExpense(
      { id: expenseToDelete.id, deleteAll },
      {
        onSuccess: () => {
          toast.success('Despesa excluída com sucesso!');
          setExpenseToDelete(null);
        },
        onError: () => toast.error('Erro ao excluir a despesa.'),
      },
    );
  };

  const actionsExpenses: ActionButton[] = [
    {
      label: 'Editar Despesa',
      icon: <Pencil />,
      onClick: (row: Expense) => setExpenseToEdit(row),
    },
    {
      label: 'Marcar como Pago',
      icon: <CheckCircle />,
      disabled: (row: Expense) => row.status === 'paid',
      onClick: (row: Expense) => {
        updateStatus(
          { id: row.id, status: 'paid' },
          { onSuccess: () => toast.success('Despesa marcada como paga!') },
        );
      },
    },
    {
      label: 'Marcar como Pendente',
      icon: <Clock />,
      disabled: (row: Expense) => row.status === 'pending',
      onClick: (row: Expense) => {
        updateStatus(
          { id: row.id, status: 'pending' },
          { onSuccess: () => toast.success('Despesa marcada como pendente!') },
        );
      },
    },
    {
      label: 'Excluir Despesa',
      icon: <Trash2 />,
      onClick: (row: Expense) => setExpenseToDelete(row),
    },
  ];

  return (
    <>
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

      <DialogEditExpense
        expense={expenseToEdit}
        onClose={() => setExpenseToEdit(null)}
      />

      <DialogConfirmDeleteExpense
        expense={expenseToDelete}
        isPending={isDeleting}
        onClose={() => setExpenseToDelete(null)}
        onDeleteOne={() => handleDelete(false)}
        onDeleteAll={() => handleDelete(true)}
      />
    </>
  );
}

export { ListExpensesDataTable };

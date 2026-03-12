import { useState } from 'react';
import { DataTable } from '@components/datatable';
import { ActionButton } from '@shared/types/actionButtonType';
import { Pencil, Trash2 } from 'lucide-react';
import { tableColumnsIncomes } from '../tableColumnsIncomes';
import { useListingIncomesQuery } from '../../hooks/queries/useListingIncomesQuery';
import { useDeleteIncomeMutation } from '../../hooks/mutations/useDeleteIncomeMutation';
import { Income } from '@shared/types/income';
import { usePagination } from '@shared/hooks/usePagination';
import { DialogEditIncome } from '../dialogEditIncome';
import { toast } from 'sonner';

function ListIncomesDataTable() {
  const [incomeToEdit, setIncomeToEdit] = useState<Income | null>(null);

  const pagination = usePagination();
  const { data: listingIncomes, isLoading } = useListingIncomesQuery({
    page: pagination.pageInfo.value.page,
    size: pagination.pageInfo.value.perPage,
  });

  const { mutate: deleteIncome } = useDeleteIncomeMutation();

  const actionsIncomes: ActionButton[] = [
    {
      label: 'Editar Receita',
      icon: <Pencil />,
      onClick: (row: Income) => setIncomeToEdit(row),
    },
    {
      label: 'Excluir Receita',
      icon: <Trash2 />,
      onClick: (row: Income) =>
        deleteIncome(row.id, {
          onSuccess: () => toast.success('Receita excluída com sucesso!'),
          onError: () => toast.error('Erro ao excluir a receita.'),
        }),
    },
  ];

  return (
    <>
      <DataTable
        actionButtons={actionsIncomes}
        columns={tableColumnsIncomes}
        data={listingIncomes?.data || []}
        isLoading={isLoading}
        pageInfo={{
          page: pagination.pageInfo.value.page,
          perPage: pagination.pageInfo.value.perPage,
          total: listingIncomes?.total || 0,
        }}
        handleSelectPerPage={pagination.handleSelectPerPage}
        handlePreviousPage={pagination.handlePreviousPage}
        handleNextPage={pagination.handleNextPage}
      />

      <DialogEditIncome
        income={incomeToEdit}
        onClose={() => setIncomeToEdit(null)}
      />
    </>
  );
}

export { ListIncomesDataTable };

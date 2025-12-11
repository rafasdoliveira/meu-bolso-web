import { DataTable } from '@components/datatable';
import { ActionButton } from '@shared/types/actionButtonType';
import { Pencil } from 'lucide-react';
import { tableColumnsIncomes } from '../tableColumnsIncomes';
import { useListingIncomesQuery } from '../../hooks/useListingIncomesQuery';
import { Income } from '@shared/types/income';
import { usePagination } from '@shared/hooks/usePagination';

function ListIncomesDataTable() {
  const pagination = usePagination();
  const { data: listingIncomes, isLoading } = useListingIncomesQuery({
    page: pagination.pageInfo.value.page,
    size: pagination.pageInfo.value.perPage,
  });

  const actionsIncomes: ActionButton[] = [
    {
      label: 'Editar Receita',
      icon: <Pencil />,
      onClick: (row: Income) => {
        console.log(row);
      },
    },
  ];

  return (
    <div>
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
    </div>
  );
}

export { ListIncomesDataTable };

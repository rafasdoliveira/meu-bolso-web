import { cn } from '@components/lib/utils';
import { Badge } from '@components/ui/badge';
import { Income } from '@shared/types/income';
import { ColumnDef } from '@tanstack/react-table';

const tableColumnsIncomes: ColumnDef<Income>[] = [
  {
    accessorKey: 'source',
    header: 'Fonte',
  },
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'paymentType',
    header: 'Tipo de Pagamento',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status');

      return (
        <Badge
          className={cn(
            'capitalize',
            status === 'Confirmado' && 'bg-green-500 hover:bg-green-500',
            status === 'Pendente' && 'bg-yellow-500 hover:bg-yellow-500',
            status === 'Cancelado' && 'bg-red-500 hover:bg-red-500',
            !['Confirmado', 'Pendente', 'Cancelado'].includes(status) &&
              'bg-gray-400 hover:bg-gray-400',
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notas',
  },
];

export { tableColumnsIncomes };

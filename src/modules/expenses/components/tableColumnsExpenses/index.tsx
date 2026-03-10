import { cn } from '@components/lib/utils';
import { Badge } from '@components/ui/badge';
import { Expense } from '@shared/types/expense';
import { ColumnDef } from '@tanstack/react-table';

const tableColumnsExpenses: ColumnDef<Expense>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
  },
  {
    accessorKey: 'subcategory',
    header: 'Categoria',
  },
  {
    accessorKey: 'paymentType',
    header: 'Tipo de Pagamento',
  },
  {
    accessorKey: 'installment',
    header: 'Parcela',
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
            status === 'paid' && 'bg-green-500 hover:bg-green-500',
            status === 'pending' && 'bg-yellow-500 hover:bg-yellow-500',
            !['paid', 'pending'].includes(status) && 'bg-gray-400 hover:bg-gray-400',
          )}
        >
          {status === 'paid' ? 'Pago' : 'Pendente'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notas',
  },
];

export { tableColumnsExpenses };

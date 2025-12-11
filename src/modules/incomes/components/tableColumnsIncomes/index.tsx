import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@shared/components/ui/badge';
import { cn } from '@components/lib/utils';
import { Income } from '@shared/types/income';

const tableColumnsIncomes: ColumnDef<Income>[] = [
  {
    accessorKey: 'source_id',
    header: 'Fonte',
    cell: (info) => {
      const source = info.getValue() as number;

      const sourceMap: Record<number, string> = {
        1: 'Salário',
        2: 'Freelance',
        3: 'Venda',
        4: 'Presente',
      };

      return sourceMap[source] || 'Desconhecido';
    },
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: (info) => `R$ ${info.getValue()}`,
  },
  {
    accessorKey: 'payment_type',
    header: 'Tipo de Pagamento',
    cell: (info) => {
      const type = info.getValue() as number;

      const paymentMap: Record<number, { text: string; color: string }> = {
        1: { text: 'Débito', color: 'bg-blue-600' },
        2: { text: 'Crédito', color: 'bg-indigo-600' },
        3: { text: 'Dinheiro', color: 'bg-yellow-600' },
        4: { text: 'Pix', color: 'bg-green-600' },
      };

      const { text, color } = paymentMap[type] || {
        text: 'Desconhecido',
        color: 'bg-gray-600',
      };

      return (
        <Badge variant='outline' className={cn('text-white', color)}>
          {text}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as number;

      const statusMap: Record<number, { text: string; color: string }> = {
        1: { text: 'Pendente', color: 'bg-yellow-600' },
        2: { text: 'Recebido', color: 'bg-green-600' },
        3: { text: 'Cancelado', color: 'bg-red-600' },
      };

      const { text, color } = statusMap[status] || {
        text: 'Desconhecido',
        color: 'bg-gray-600',
      };

      return (
        <Badge variant='outline' className={cn('text-white', color)}>
          {text}
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

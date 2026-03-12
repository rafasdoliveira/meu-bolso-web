import { Button } from '@shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog';
import { Expense } from '@shared/types/expense';

type Props = {
  expense: Expense | null;
  isPending: boolean;
  onClose: () => void;
  onDeleteOne: () => void;
  onDeleteAll: () => void;
};

function deleteAllLabel(recurrent: boolean) {
  return recurrent ? 'Esta e as futuras' : 'Todas as parcelas';
}

function DialogConfirmDeleteExpense({
  expense,
  isPending,
  onClose,
  onDeleteOne,
  onDeleteAll,
}: Props) {
  const hasInstallments = Boolean(expense?.installment);
  const isRecurrent = Boolean(expense?.is_recurrent);
  const isSeries = hasInstallments || isRecurrent;

  return (
    <Dialog open={Boolean(expense)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Excluir despesa</DialogTitle>
          <DialogDescription>
            {hasInstallments && (
              <>
                A despesa <strong>{expense?.description}</strong> possui
                parcelas ({expense?.installment}). Deseja excluir somente esta
                parcela ou todas as parcelas da série?
              </>
            )}
            {isRecurrent && (
              <>
                A despesa <strong>{expense?.description}</strong> é recorrente.
                Deseja excluir somente esta ocorrência ou esta e todas as
                futuras?
              </>
            )}
            {!isSeries && (
              <>
                Tem certeza que deseja excluir a despesa{' '}
                <strong>{expense?.description}</strong>? Esta ação não pode ser
                desfeita.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex-col gap-2 sm:flex-row'>
          <Button variant='ghost' onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          {isSeries ? (
            <>
              <Button variant='outline' onClick={onDeleteOne} disabled={isPending}>
                Somente esta
              </Button>
              <Button variant='destructive' onClick={onDeleteAll} disabled={isPending}>
                {isPending ? 'Excluindo...' : deleteAllLabel(isRecurrent)}
              </Button>
            </>
          ) : (
            <Button variant='destructive' onClick={onDeleteOne} disabled={isPending}>
              {isPending ? 'Excluindo...' : 'Confirmar'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogConfirmDeleteExpense };

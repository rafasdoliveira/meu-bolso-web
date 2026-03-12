import { Button } from '@shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/components/ui/dialog';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateExpenseCategoryMutation } from '../../hooks/mutations/useCreateExpenseCategoryMutation';

const schema = z.object({
  name: z.string().min(1, 'Informe o nome da categoria.'),
});

type FormValues = z.infer<typeof schema>;

function DialogCreateExpenseCategory() {
  const { mutate: createCategory, isPending } =
    useCreateExpenseCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: FormValues) => {
    createCategory(data, {
      onSuccess: () => {
        toast.success('Categoria criada com sucesso!');
        reset();
      },
      onError: () => {
        toast.error('Erro ao criar a categoria. Tente novamente.');
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Categoria
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-100'>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Informe o nome da nova categoria de despesa.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-2'>
          <Label htmlFor='category-name'>Nome</Label>
          <Input
            id='category-name'
            placeholder='Ex: Alimentação'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-destructive text-sm'>{errors.name.message}</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='destructive'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='button'
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogCreateExpenseCategory };

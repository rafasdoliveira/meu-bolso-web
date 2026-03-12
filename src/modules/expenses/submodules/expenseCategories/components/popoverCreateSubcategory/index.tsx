import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/components/ui/popover';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateExpenseSubcategoryMutation } from '../../hooks/mutations/useCreateExpenseSubcategoryMutation';

type Props = {
  categoryId: number;
};

function PopoverCreateSubcategory({ categoryId }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const { mutate: createSubcategory, isPending } =
    useCreateExpenseSubcategoryMutation();

  const handleSubmit = () => {
    if (!name.trim()) return;

    createSubcategory(
      { categoryId, name: name.trim() },
      {
        onSuccess: () => {
          toast.success('Subcategoria criada com sucesso!');
          setName('');
          setOpen(false);
        },
        onError: () => toast.error('Erro ao criar subcategoria.'),
      },
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size='icon' variant='ghost' className='size-6'>
          <Plus className='size-3.5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64' align='start'>
        <div className='space-y-3'>
          <p className='text-sm font-medium'>Nova subcategoria</p>
          <div className='space-y-1.5'>
            <Label htmlFor={`sub-name-${categoryId}`} className='text-xs'>
              Nome
            </Label>
            <Input
              id={`sub-name-${categoryId}`}
              placeholder='Ex: Almoço'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className='h-8 text-sm'
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button size='sm' variant='ghost' onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              size='sm'
              onClick={handleSubmit}
              disabled={isPending || !name.trim()}
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { PopoverCreateSubcategory };

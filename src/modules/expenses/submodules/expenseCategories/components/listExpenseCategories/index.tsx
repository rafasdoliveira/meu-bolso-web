import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { SubcategoryDto } from '../../services/getExpenseCategories/getExpenseCategories.dto';
import { useListingExpenseCategoriesQuery } from '../../hooks/queries/useListingExpenseCategoriesQuery';
import { useUpdateExpenseCategoryMutation } from '../../hooks/mutations/useUpdateExpenseCategoryMutation';
import { useDeleteExpenseCategoryMutation } from '../../hooks/mutations/useDeleteExpenseCategoryMutation';
import { useUpdateExpenseSubcategoryMutation } from '../../hooks/mutations/useUpdateExpenseSubcategoryMutation';
import { useDeleteExpenseSubcategoryMutation } from '../../hooks/mutations/useDeleteExpenseSubcategoryMutation';
import { PopoverCreateSubcategory } from '../popoverCreateSubcategory';

function SubcategoryItem({ sub }: { readonly sub: SubcategoryDto }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(sub.name);

  const { mutate: updateSub, isPending: isUpdating } = useUpdateExpenseSubcategoryMutation();
  const { mutate: deleteSub } = useDeleteExpenseSubcategoryMutation();

  const handleSave = () => {
    if (!name.trim() || name === sub.name) { setEditing(false); return; }
    updateSub(
      { id: sub.id, name: name.trim() },
      {
        onSuccess: () => { toast.success('Subcategoria atualizada!'); setEditing(false); },
        onError: () => toast.error('Erro ao atualizar subcategoria.'),
      },
    );
  };

  const handleDelete = () => {
    deleteSub(sub.id, {
      onSuccess: () => toast.success('Subcategoria excluída!'),
      onError: () => toast.error('Erro ao excluir subcategoria.'),
    });
  };

  if (editing) {
    return (
      <div className='flex items-center gap-1'>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setEditing(false);
          }}
          className='h-6 px-1.5 text-xs'
          autoFocus
        />
        <Button size='icon' variant='ghost' className='size-5' onClick={handleSave} disabled={isUpdating}>
          <Check className='size-3 text-green-600' />
        </Button>
        <Button size='icon' variant='ghost' className='size-5' onClick={() => { setName(sub.name); setEditing(false); }}>
          <X className='text-destructive size-3' />
        </Button>
      </div>
    );
  }

  return (
    <div className='group flex items-center gap-0.5 rounded-md border bg-secondary px-2 py-0.5 text-xs font-medium'>
      <span>{sub.name}</span>
      <Button size='icon' variant='ghost' className='size-4 opacity-0 group-hover:opacity-100' onClick={() => setEditing(true)}>
        <Pencil className='size-2.5' />
      </Button>
      <Button size='icon' variant='ghost' className='text-destructive hover:text-destructive size-4 opacity-0 group-hover:opacity-100' onClick={handleDelete}>
        <Trash2 className='size-2.5' />
      </Button>
    </div>
  );
}

function ListExpenseCategories() {
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const { data: categories, isLoading } = useListingExpenseCategoriesQuery();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateExpenseCategoryMutation();
  const { mutate: deleteCategory } = useDeleteExpenseCategoryMutation();

  const handleEditCategory = (id: number, name: string) => {
    setEditingCategoryId(id);
    setEditingName(name);
  };

  const handleSaveCategory = (id: number) => {
    if (!editingName.trim()) return;
    updateCategory(
      { id, name: editingName.trim() },
      {
        onSuccess: () => { toast.success('Categoria atualizada!'); setEditingCategoryId(null); },
        onError: () => toast.error('Erro ao atualizar categoria.'),
      },
    );
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => toast.success('Categoria excluída!'),
      onError: () => toast.error('Erro ao excluir categoria.'),
    });
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {['a', 'b', 'c', 'd', 'e', 'f'].map((k) => (
          <Skeleton key={k} className='h-28 rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
      {categories.map((category) => (
        <Card key={category.id} className='gap-3 py-4'>
          <CardHeader className='px-4'>
            <div className='flex items-center justify-between gap-2'>
              {editingCategoryId === category.id ? (
                <div className='flex flex-1 items-center gap-1'>
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveCategory(category.id);
                      if (e.key === 'Escape') setEditingCategoryId(null);
                    }}
                    className='h-7 px-2 text-sm'
                    autoFocus
                  />
                  <Button size='icon' variant='ghost' className='size-6' onClick={() => handleSaveCategory(category.id)} disabled={isUpdating}>
                    <Check className='size-3.5 text-green-600' />
                  </Button>
                  <Button size='icon' variant='ghost' className='size-6' onClick={() => setEditingCategoryId(null)}>
                    <X className='text-destructive size-3.5' />
                  </Button>
                </div>
              ) : (
                <>
                  <CardTitle className='text-sm'>{category.name}</CardTitle>
                  <div className='flex shrink-0 items-center gap-0.5'>
                    <PopoverCreateSubcategory categoryId={category.id} />
                    <Button size='icon' variant='ghost' className='size-6' onClick={() => handleEditCategory(category.id, category.name)}>
                      <Pencil className='size-3.5' />
                    </Button>
                    <Button size='icon' variant='ghost' className='text-destructive hover:text-destructive size-6' onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className='size-3.5' />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className='flex flex-wrap gap-1.5 px-4'>
            {category.subcategories.map((sub) => (
              <SubcategoryItem key={sub.id} sub={sub} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { ListExpenseCategories };

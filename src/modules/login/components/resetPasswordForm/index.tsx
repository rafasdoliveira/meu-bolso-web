import { cn } from '@shared/components/lib/utils';
import { Button } from '@shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '../../hooks/mutations/useResetPasswordMutation';
import { ResetPasswordFormValues, resetPasswordSchema } from '../../schema/resetPasswordSchema';

function ResetPasswordForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' });
  const confirmValue = useWatch({ control, name: 'confirmPassword', defaultValue: '' });
  const passwordsMatch = confirmValue.length > 0 && passwordValue === confirmValue;

  const onSubmit = (values: ResetPasswordFormValues) => {
    if (!token) {
      toast.error('Token inválido ou expirado.');
      return;
    }
    resetPassword(
      { token, password: values.password },
      {
        onSuccess: () => {
          toast.success('Senha redefinida com sucesso!');
          navigate('/');
        },
        onError: () => toast.error('Erro ao redefinir senha. O link pode ter expirado.'),
      },
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Redefinir senha</CardTitle>
          <CardDescription>
            Digite sua nova senha abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Nova senha</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='********'
                    className='pr-9'
                    {...register('password')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2'
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-destructive text-xs'>{errors.password.message}</p>
                )}
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirmar nova senha</Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirm ? 'text' : 'password'}
                    placeholder='********'
                    className='pr-9'
                    {...register('confirmPassword')}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirm((v) => !v)}
                    className='text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2'
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                  </button>
                </div>
                {confirmValue.length > 0 && (
                  <p className={cn('flex items-center gap-1.5 text-xs', passwordsMatch ? 'text-green-600' : 'text-destructive')}>
                    {passwordsMatch
                      ? <><Check className='size-3' /> Senhas coincidem</>
                      : <><X className='size-3' /> Senhas não coincidem</>
                    }
                  </p>
                )}
              </div>
              <Button type='submit' className='w-full' disabled={isPending || !token}>
                {isPending ? 'Salvando...' : 'Salvar nova senha'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              <Link to='/' className='underline underline-offset-4'>
                Voltar para o login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { ResetPasswordForm };

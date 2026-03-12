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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '../../hooks/mutations/useForgotPasswordMutation';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../../schema/forgotPasswordSchema';

function ForgotPasswordForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const [sent, setSent] = useState(false);
  const { mutate: sendEmail, isPending } = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    sendEmail(values, {
      onSuccess: () => setSent(true),
      onError: () => toast.error('Erro ao enviar e-mail. Tente novamente.'),
    });
  };

  if (sent) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>E-mail enviado</CardTitle>
            <CardDescription>
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to='/' className='text-sm underline underline-offset-4'>
              Voltar para o login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Esqueceu sua senha?</CardTitle>
          <CardDescription>
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@exemplo.com'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='text-destructive text-xs'>{errors.email.message}</p>
                )}
              </div>
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Enviando...' : 'Enviar link'}
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

export { ForgotPasswordForm };

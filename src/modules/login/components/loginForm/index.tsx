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
import { useUserContext } from '@shared/context/user/useUserContext';
import { getApiErrorMessage } from '@shared/api/errorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '../../hooks/mutations/useLoginMutation';
import { LoginFormValues, loginSchema } from '../../schema/loginSchema';

function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const { mutate: login, isPending } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: (data) => {
        setUser({ id: data.id, name: data.name, email: data.email });
        navigate('/dashboard');
      },
      onError: (error) => toast.error(getApiErrorMessage(error, 'E-mail ou senha inválidos.')),
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Informe seu e-mail abaixo para logar na sua conta.
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
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Senha</Label>
                  <Link
                    to='/forgot-password'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
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
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Não possui conta?{' '}
              <Link to='/register' className='underline underline-offset-4'>
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { LoginForm };

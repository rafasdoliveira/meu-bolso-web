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
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useRegisterMutation } from '../../hooks/mutations/useRegisterMutation';
import { RegisterFormValues, registerSchema } from '../../schema/registerSchema';

const PASSWORD_RULES = [
  { label: 'Ao menos 8 caracteres', test: (v: string) => v.length >= 8 },
  { label: 'Uma letra maiúscula', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Uma letra minúscula', test: (v: string) => /[a-z]/.test(v) },
  { label: 'Um caractere especial', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function PasswordChecklist({ value }: { readonly value: string }) {
  if (!value) return null;
  return (
    <ul className='mt-1 space-y-1'>
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(value);
        return (
          <li key={rule.label} className={cn('flex items-center gap-1.5 text-xs', ok ? 'text-green-600' : 'text-muted-foreground')}>
            {ok ? <Check className='size-3' /> : <X className='size-3' />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

function RegisterForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const { mutate: registerUser, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' });
  const confirmValue = useWatch({ control, name: 'confirmPassword', defaultValue: '' });
  const passwordsMatch = confirmValue.length > 0 && passwordValue === confirmValue;

  const onSubmit = (values: RegisterFormValues) => {
    registerUser(
      { name: values.name, email: values.email, password: values.password },
      {
        onSuccess: (data) => {
          setUser({ id: data.id, name: data.name, email: data.email });
          navigate('/dashboard');
        },
        onError: () => toast.error('Erro ao criar conta. Tente novamente.'),
      },
    );
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Criar conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Nome</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Seu nome'
                  {...register('name')}
                />
                {errors.name && (
                  <p className='text-destructive text-xs'>{errors.name.message}</p>
                )}
              </div>
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
                <Label htmlFor='password'>Senha</Label>
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
                <PasswordChecklist value={passwordValue} />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirmar senha</Label>
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
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Já possui conta?{' '}
              <Link to='/' className='underline underline-offset-4'>
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { RegisterForm };

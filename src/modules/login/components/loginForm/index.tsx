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
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const navigate = useNavigate();

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
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    to='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='********'
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                onClick={() => navigate('/dashboard')}
              >
                Login
              </Button>
              <Button variant='outline' className='w-full'>
                Entrar com Google
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Não possui conta?{' '}
              <Link to='#' className='underline underline-offset-4'>
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

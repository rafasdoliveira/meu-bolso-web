import notFoundPageImg from '@shared/assets/images/notFoundPage.png';
import { Button } from '@shared/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
      <img src={notFoundPageImg} alt='not-found' width={350} />
      <p className='text-lg font-bold'>Ops!</p>
      <p className='mb-6 text-gray-600'>
        A página que você procura não foi encontrada.
      </p>
      <Button
        variant='default'
        onClick={() => navigate('/')}
        className='h-12 cursor-pointer'
      >
        Voltar para home
      </Button>
    </div>
  );
}

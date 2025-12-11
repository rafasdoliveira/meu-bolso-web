import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
      <h1 className='mb-4 text-6xl font-bold'>404</h1>
      <p className='mb-6 text-xl'>
        Ops! A página que você procura não foi encontrada.
      </p>
      <Link
        to='/'
        className='rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700'
      >
        Voltar para Home
      </Link>
    </div>
  );
}

import { Card } from '@components/ui/card';

function FinancialIndicators() {
  return (
    <div className='grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card className='h-28 gap-2 px-6'>
        <div className='text-lg font-semibold'>Total Recebido</div>
        <div className='text-base font-bold'>R$ 20.450,00</div>
      </Card>
      <Card className='h-28 gap-2 px-6'>
        <div className='text-lg font-semibold'>Qtde Entradas</div>
        <div className='text-base font-bold'>R$ 5</div>
      </Card>
      <Card className='h-28 gap-2 px-6'>
        <div className='text-lg font-semibold'>Maior Receita</div>
        <div className='text-base font-bold'>R$ 12.450,00</div>
      </Card>
      <Card className='h-28 gap-2 px-6'>
        <div className='text-lg font-semibold'>Receita Média</div>
        <div className='text-base font-bold'>R$ 4.090,00</div>
      </Card>
    </div>
  );
}

export { FinancialIndicators };

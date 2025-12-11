import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { useEffect, useState } from 'react';
import { PiCaretCircleLeft, PiCaretCircleRight } from 'react-icons/pi';

type IPagination = {
  pageInfo?: PageInfo;
  handleSelectPerPage?: (perPage: number) => void;
  handlePreviousPage?: () => void;
  handleNextPage?: () => void;
  label?: string;
  numbersPerPage?: number[];
};

export type PageInfo = {
  page: number;
  total: number;
  perPage: number;
};

const Pagination = ({
  pageInfo,
  handleSelectPerPage,
  handlePreviousPage,
  handleNextPage,
  label,
  numbersPerPage = [5, 10],
}: IPagination) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!pageInfo) return;

    const total = Math.ceil(pageInfo.total / pageInfo.perPage);
    setTotalPages(total);
  }, [pageInfo?.perPage, pageInfo?.total]);

  return (
    <div className='flex w-full flex-col-reverse justify-center gap-2 px-9 py-3 md:flex-row'>
      {handleSelectPerPage && (
        <div className='flex items-center gap-3'>
          <p className='text-sm text-zinc-700'>
            {label ? label : 'Registros por página:'}
          </p>
          <Select
            onValueChange={(value) => handleSelectPerPage(parseInt(value))}
          >
            <SelectTrigger
              data-testid={'items-per-page-dropdown'}
              className='h-10 w-[70px]'
            >
              <SelectValue placeholder={pageInfo?.perPage?.toString()} />
            </SelectTrigger>
            <SelectContent side='right' align='end'>
              {numbersPerPage.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className='flex items-center justify-center gap-2'>
        {pageInfo && handlePreviousPage && (
          <div>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Anterior'
              onClick={handlePreviousPage}
              disabled={pageInfo.page === 1}
            >
              <PiCaretCircleLeft className='text-lg text-zinc-700' />
            </Button>
          </div>
        )}
        <p className='text-sm text-zinc-700'>
          Página {pageInfo?.page} de {totalPages}
        </p>
        {pageInfo && handleNextPage && (
          <div>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Próximo'
              onClick={handleNextPage}
              disabled={totalPages <= 1 || pageInfo.page === totalPages}
            >
              <PiCaretCircleRight className='text-lg text-zinc-700' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Pagination };
export type { IPagination };

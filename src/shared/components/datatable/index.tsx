import { cn } from '@components/lib/utils';
import { Loader } from '@components/loader';
import { Tooltip } from '../tooltip';
import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { IPagination, Pagination } from './pagination';
import { DropdownMenu } from '@components/dropdownMenu';
import { ActionButton } from '@shared/types/actionButtonType';
import notFoundData from '../../assets/images/notFoundData.png';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  handleRowClick?: (row: TData) => void;
  data: TData[];
  actionButtons?: ActionButton[];
  actions?: ActionButton[];
  isLoading?: boolean;
  notFound?: {
    text: string;
    action?: () => void;
    actionText?: string;
  };
} & IPagination;

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  actionButtons = [],
  handleRowClick,
  pageInfo,
  handleSelectPerPage,
  handlePreviousPage,
  handleNextPage,
  actions = [],
  notFound,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <>
      <div className='rounded-md border bg-white'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {actionButtons.length > 0 && (
                  <TableHead className='text-center'>Ações</TableHead>
                )}
                {actions.length > 0 && (
                  <TableHead className='flex items-center justify-center'>
                    Ações
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-center'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <Loader />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(handleRowClick && 'cursor-pointer')}
                  onClick={() =>
                    handleRowClick &&
                    actionButtons.length === 0 &&
                    actions.length === 0 &&
                    handleRowClick(row.original)
                  }
                >
                  {actionButtons.length > 0 && (
                    <TableCell className='text-center'>
                      <DropdownMenu
                        buttons={actionButtons.map((buttonProperty) => {
                          return {
                            ...buttonProperty,
                            icon:
                              typeof buttonProperty.icon === 'function'
                                ? buttonProperty.icon(row.original)
                                : buttonProperty.icon,
                            onClick: () => buttonProperty.onClick(row.original),
                            disabled:
                              buttonProperty.disabled &&
                              typeof buttonProperty.disabled === 'function'
                                ? buttonProperty.disabled(row.original)
                                : buttonProperty.disabled,
                          };
                        })}
                      >
                        <Button size='icon' variant='ghost'>
                          <PiDotsThreeVerticalBold />
                        </Button>
                      </DropdownMenu>
                    </TableCell>
                  )}
                  {actions.length > 0 && (
                    <TableCell className='flex items-center justify-center'>
                      {actions.map((action, index) => (
                        <Tooltip key={index} text={action.label} side='right'>
                          <Button
                            className='text-primary border-primary/50 hover:bg-primary/10 hover:text-primary border-[1px] disabled:cursor-not-allowed disabled:border-0 disabled:bg-white disabled:text-gray-500'
                            key={index}
                            size='icon'
                            variant='ghost'
                            disabled={
                              action.disabled &&
                              typeof action.disabled === 'function'
                                ? action.disabled(row.original)
                                : action.disabled
                            }
                            onClick={() => action.onClick(row.original)}
                          >
                            {typeof action.icon === 'function'
                              ? action.icon(row.original)
                              : action.icon}
                          </Button>
                        </Tooltip>
                      ))}
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell key={'notfound'} colSpan={columns.length + 1}>
                  <div className='flex h-96 flex-col content-center items-center justify-center bg-white font-semibold'>
                    <img
                      className='w-[200px] self-center'
                      src={notFoundData}
                      alt='Nenhum dado encontrado'
                    />
                    {!notFound ? (
                      <p>Oops, parece que nenhum dado foi encontrado.</p>
                    ) : (
                      <p>
                        {notFound.text}
                        {notFound.action && notFound.actionText && (
                          <Button
                            className='p-0'
                            variant={'link'}
                            onClick={notFound.action}
                          >
                            {notFound.actionText}
                          </Button>
                        )}
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageInfo && data.length > 0 && (
        <div className='flex items-center justify-end space-x-2 px-12 py-4'>
          <Pagination
            pageInfo={pageInfo}
            handleSelectPerPage={handleSelectPerPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>
      )}
    </>
  );
}

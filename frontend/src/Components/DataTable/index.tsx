import { useState, useCallback } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef, 
  ColumnFiltersState, 
  SortingState, 
  VisibilityState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useReactTable 
} from '@tanstack/react-table';
import { Input } from '@/Components/ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { IPaginationResponse } from '@/Utils/exploration/pagination';

export type IDataTableColumn<T> = ColumnDef<T> & {
  label?: string;
  accessorKey?: string;
}

interface IDataTableProps<T> {
  columns: IDataTableColumn<T>[];
  data: T[];
  searchField?: string;
  searchValue?: string;
  pagination?: IPaginationResponse;
  nextPage?: () => void;
  previousPage?: () => void;
}

function DataTable<T>({ 
  columns, 
  data, 
  searchField, 
  pagination,
  nextPage,
  previousPage 
}: IDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    // PAGINATION CONFIG -----------------------------------------------------------
    getPaginationRowModel: pagination ? undefined : getPaginationRowModel(),
    pageCount: pagination ? pagination.pageCount : undefined,
    manualPagination: !!pagination,
    // ----------------------------------------------------------------------------- 
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination ? {
        pageIndex: pagination.page-1,
        pageSize: pagination.limit,
      } : undefined
    },
  });

  const getTableColumnDef = useCallback(() => {
    const cols = table.getAllColumns();
    return cols.map(col => {
      const colDef = columns.find(c => c.accessorKey===col.id);
      return {
        ...col,
        columnDef: {
          ...col.columnDef,
          label: colDef?.label ?? col.id
        }
      };
    });
  }, [ table ]);

  return (
    <>
      <div className="flex items-center py-4">
        {searchField && (
          <Input
            placeholder="Filter..."
            value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchField)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getTableColumnDef()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {pagination ? (
          <div className="flex-1 text-sm text-muted-foreground">
            Page {pagination.page} of{' '} {pagination.pageCount}
          </div>
        ) : (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}
        {pagination && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => (pagination && previousPage) ? previousPage() : table.previousPage()}
              disabled={pagination ? pagination.page===1 : !table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (pagination && nextPage) ? nextPage() : table.nextPage()}
              disabled={pagination ? pagination.page===pagination.pageCount : !table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default DataTable;

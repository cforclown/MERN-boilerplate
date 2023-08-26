import { ColumnDef } from '@tanstack/react-table';

export type IDataTableColumn<T> = ColumnDef<T> & {
  label?: string;
  accessorKey?: string;
}

export const DATA_TABLE_PAGE_SIZES = [
  10,
  25,
  50,
  75,
  100,
];

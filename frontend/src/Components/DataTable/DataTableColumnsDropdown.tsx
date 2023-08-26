import { Column } from '@tanstack/react-table';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { IDataTableColumn } from './DataTable.service';

interface IDataTableColumnsDropdown<T> {
  columns: Column<T, unknown>[];
  className?: string;
}

function DataTableColumnsDropdown<T>({ columns, className }: IDataTableColumnsDropdown<T>): JSX.Element {
  return (
    <div  className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columns
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                {(column.columnDef as IDataTableColumn<T>).label ?? column.id}
              </DropdownMenuCheckboxItem>
              ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableColumnsDropdown;

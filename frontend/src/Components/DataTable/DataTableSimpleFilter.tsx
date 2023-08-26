import { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

interface IDataTableSimpleFilterInput {
  value?: string;
  column?: Column<any, unknown>;
  onChange?: (val: string) => void;
  placeholder?: string;
}

function DataTableSimpleFilter({ value, onChange, column, placeholder }: IDataTableSimpleFilterInput): JSX.Element {
  return (
    <Input
      placeholder={placeholder ?? 'Filter...'}
      value={value ?? (column?.getFilterValue() as string) ?? ''}
      onChange={(e) => onChange ? onChange(e.target.value) : column?.setFilterValue(e.target.value)}
      className="max-w-sm"
    />
  );
}

export default DataTableSimpleFilter;

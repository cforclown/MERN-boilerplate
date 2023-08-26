import { IDataTableColumn } from '@/Components/DataTable/DataTable.service';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export interface ISchedule {
  _id: string
  name: string
  start: Date;
  end: Date;
  desc: string;
}

export const schedulesColumnDefs: IDataTableColumn<ISchedule>[] = [
  {
    accessorKey: 'name',
    label: 'Name',
    header: ({ column }) => (
      <div className='text-center'>
        <Button
            variant="ghost"
            className='text-center'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'start',
    label: 'Start date',
    header: ({ column }) => (
      <div className='text-center'>
        <Button
            variant="ghost"
            className='text-center'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
          Start date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const startDate = new Date(row.getValue('start'));
      return (
        <div className="text-center font-medium">
          {startDate.toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'end',
    label: 'End date',
    header: ({ column }) => (
      <div className='text-center'>
        <Button
            variant="ghost"
            className='text-center'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
          End date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const endDate = new Date(row.getValue('end'));
      return (
        <div className="text-center font-medium">
          {endDate.toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'desc',
    label: 'Description',
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue('desc')}</div>,
  },
  {
    id: 'actions',
    label: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to={'/schedules/'+schedule._id}>
                View schedule details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

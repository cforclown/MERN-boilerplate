import { Link, useNavigate } from 'react-router-dom';
import { getSchedules as getSchedulesWithoutPagination, getSchedulesWithPagination } from './Schedules.service';
import { schedulesFields } from './Schedules.metadata';
import { Exploration } from '@/Components/Exploration/Exploration';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/Components/ui/button';
import { IDataTableActionColumn } from '@/Components/DataTable/DataTable.service';

function Schedules() {
  const navigate = useNavigate();

  const actionColumn: IDataTableActionColumn = {
    id: 'actions',
    label: 'Actions',
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to={`/schedules/details/${row.original._id}`}>
              View schedule details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  };

  return (
    <Exploration
      title='Schedules'
      columns={schedulesFields}
      clientPaginationFetchFunc={getSchedulesWithoutPagination}
      apiPaginationGetDataFunc={getSchedulesWithPagination}
      filterField='name'
      actionColumn={actionColumn}
      onNewClick={() => navigate('/schedules/form')}
    />
  );
}

export default Schedules;

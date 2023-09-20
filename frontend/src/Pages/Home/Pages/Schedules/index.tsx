import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteSchedule, getSchedules as getSchedulesWithoutPagination, getSchedulesWithPagination } from './Schedules.service';
import { schedulesFields } from './Schedules.metadata';
import Exploration from '@/Components/Exploration/Exploration';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Button } from '@/Components/ui/button';
import { IDataTableActionColumn } from '@/Components/DataTable/DataTable.service';
import DashboardContentWrapper from '@/Components/Wrappers/DashboardContentWrapper';
import withCommonState, { IWithCommonStateProps } from '@/Components/HOC/withCommonState';
import { openAlertDialog } from '@/Store/Reducers/AlertDialog/AlertDialog';

interface ISchedules extends IWithCommonStateProps {}

function Schedules({ t, navigate }: ISchedules) {
  const dispatch = useDispatch();
  const onDeleteClick = async (id: string) => dispatch(openAlertDialog({
    onConfirm: async (): Promise<void> => {
      await deleteSchedule(id);
      toast.success(t('common.deletedSuccessfully'));
    }
  }));

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
          <DropdownMenuItem onClick={() => navigate(`/schedules/details/${row.original._id}`)}>
            {t('common.viewDetails')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/schedules/form/${row.original._id}`)}>
            {t('common.edit')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeleteClick(row.original._id)}>
            {t('common.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  };

  return (
    <DashboardContentWrapper>
      <Exploration
        title={t('schedules.schedules')}
        columns={schedulesFields}
        clientPaginationFetchFunc={getSchedulesWithoutPagination}
        apiPaginationGetDataFunc={getSchedulesWithPagination}
        filterField='name'
        actionColumn={actionColumn}
        onNewClick={() => navigate('/schedules/form')}
      />
    </DashboardContentWrapper>
  );
}

export default withCommonState(Schedules);

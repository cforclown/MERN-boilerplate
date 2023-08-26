import { getSchedules as getSchedulesWithoutPagination, getSchedulesWithPagination } from './Schedules.service';
import { schedulesColumnDefs } from './Schedules.metadata';
import { Exploratin } from '@/Components/Exploration/Exploration';

export function Schedules() {

  return (
    <Exploratin
      title='Schedules'
      columns={schedulesColumnDefs}
      clientPaginationFetchFunc={getSchedulesWithoutPagination}
      apiPaginationGetDataFunc={getSchedulesWithPagination}
      filterField='name'
    />
  );
}

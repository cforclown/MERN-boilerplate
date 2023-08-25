import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { omit } from 'ramda';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import ContentWrapper from '../../Content/ContentWrapper';
import DataTable, { IDataTableColumn } from '@/Components/DataTable';
import { getSchedulesWithPagination } from './Schedules.service';
import { IExplorationPayload, IExplorationResponse } from '@/Utils/exploration/exploration';
import callApiWrapper from '@/Components/Wrappers/CallApiWrapper';

export interface ISchedule {
  _id: string
  name: string
  start: Date;
  end: Date;
  desc: string;
}

export function Schedules() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exploration, setExploration] = useState<IExplorationResponse<ISchedule>>({
    data: [],
    exploration: {
      query: '',
      pagination: {
        page: 1,
        limit: 5,
        pageCount: 1,
        sort: { by: 'name', order: 1 }
      }
    }
  });

  const getSchedules = useCallback(callApiWrapper(async (payload: IExplorationPayload) => {
    const response = await getSchedulesWithPagination({
      ...payload,
      pagination: omit(['pageCount'], payload.pagination)
    });
    
    setExploration(response);
  }, setLoading), [ exploration ]);

  useEffect(() =>{
    getSchedules(exploration.exploration);
  }, [ exploration.exploration.pagination.page ]);

  const columns = useMemo<IDataTableColumn<ISchedule>[]>(() => [
    {
      accessorKey: 'name',
      label: 'Name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'start',
      label: 'Start date',
      header: ({ column }) => {
        return (
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
        );
      },
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
      header: ({ column }) => {
        return (
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
        );
      },
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
              <DropdownMenuItem onClick={() => navigate('/schedules/'+schedule._id)}>View schedule details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], []);

  const nextPage = () => setExploration({
    ...exploration,
    exploration: {
      ...exploration.exploration,
      pagination: {
        ...exploration.exploration.pagination,
        page: exploration.exploration.pagination.page+1
      }
    }
  });

  const previousPage = () => setExploration({
    ...exploration,
    exploration: {
      ...exploration.exploration,
      pagination: {
        ...exploration.exploration.pagination,
        page: exploration.exploration.pagination.page-1
      }
    }
  });

  return (
    <ContentWrapper loading={loading}>
      <DataTable 
        columns={columns} 
        data={exploration.data} 
        searchField='name' 
        searchValue={exploration.exploration.query}
        pagination={exploration.exploration.pagination}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </ContentWrapper>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { useCallback, useState, useEffect, useRef } from 'react';
import { mergeDeepRight, omit } from 'ramda';
import { ReloadIcon } from '@radix-ui/react-icons';
import DataTable from '@/Components/DataTable';
import { IExplorationPayload, IExplorationResponse } from '@/Utils/exploration/exploration';
import callApiWrapper from '@/Components/Wrappers/CallApiWrapper';
import { DATA_TABLE_DEFAULT_PAGE_SIZES, IDataTableActionColumn } from '@/Components/DataTable/DataTable.service';
import { Switch } from '@/Components/ui/switch';
import { Label } from '@/Components/ui/label';
import { IPaginationSort, PaginationSortOrders } from '@/Utils/exploration/pagination';
import TypographyH1 from '../Typography/H1';
import { Button } from '../ui/button';
import { IMetadataField } from '@/Utils/metadata';
import withCommonState, { IWithCommonStateProps } from '../HOC/withCommonState';

export interface IExplorationProps<T> extends IWithCommonStateProps {
  title?: string;
  columns: IMetadataField<T>[];
  clientPaginationFetchFunc?: () => Promise<T[]>;
  apiPaginationGetDataFunc: (payload: IExplorationPayload) => Promise<IExplorationResponse<T>>;
  filterField?: string;
  actionColumn?: IDataTableActionColumn;
  disableClientPagination?: boolean;
  newBtnText?: string;
  onNewClick?: () => void;
}

function Exploration<T>({
  title,
  columns,
  clientPaginationFetchFunc,
  apiPaginationGetDataFunc,
  filterField,
  disableClientPagination,
  actionColumn,
  newBtnText,
  onNewClick,
  t,
  setLoading
}: IExplorationProps<T>) {
  const hasIinitialFetchRef = useRef(false);
  const [isClientPagination, setIsClientPagination] = useState(false);
  const [exploration, setExploration] = useState<IExplorationResponse<T>>({
    data: [],
    exploration: {
      query: '',
      pagination: {
        page: 1,
        limit: DATA_TABLE_DEFAULT_PAGE_SIZES[1],
        pageCount: 1,
        sort: { by: columns[0].accessorKey ?? '', order: PaginationSortOrders.ASC }
      }
    }
  });
  const onFilterChangeFetchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const getData = useCallback(callApiWrapper(async (payload: IExplorationPayload) => {
    if(isClientPagination) {
      const response = await clientPaginationFetchFunc?.();

      setExploration(Object.assign({...exploration }, { data: response}));
    } else {
      const response = await apiPaginationGetDataFunc({
        ...payload,
        pagination: omit(['pageCount'], payload.pagination)
      });
      
      setExploration(response);
    }
  }, setLoading), [ exploration ]);

  useEffect(() => {
    if(!hasIinitialFetchRef.current) {
      return;
    }
    
    onFilterChangeFetchTimeoutRef.current = setTimeout(() => {
      getData(exploration.exploration);
      onFilterChangeFetchTimeoutRef.current = undefined;
    }, 750);
  }, [ exploration.exploration.query ]);

  useEffect(() =>{
    getData(exploration.exploration);

    if(!hasIinitialFetchRef.current) {
      hasIinitialFetchRef.current = true;
    }
  }, [ 
    exploration.exploration.pagination.page,
    exploration.exploration.pagination.limit,
    exploration.exploration.pagination.sort.by,
    exploration.exploration.pagination.sort.order,
    isClientPagination
  ]);

  const refreshData = useCallback(() => {
    getData(exploration.exploration);
  }, [exploration.exploration]);

  const nextPage = () => setExploration(
    mergeDeepRight({ ...exploration }, {
    exploration: {
      pagination: {
        page: exploration.exploration.pagination.page+1
      }
    }
  }));

  const previousPage = () => setExploration(
    mergeDeepRight({ ...exploration }, {
    exploration: {
      pagination: {
        page: exploration.exploration.pagination.page-1
      }
    }
  }));

  const setPageSize = (pageSize: number) => setExploration(
    mergeDeepRight({ ...exploration }, {
      exploration: {
        pagination: {
          limit: pageSize
        }
      }
    })
  );

  const setSort = (sort: IPaginationSort) => setExploration(
    mergeDeepRight({...exploration}, {
      exploration: {
        pagination: { sort }
      }
    })
  );

  const setFilterValue = (query: string) => {
    clearTimeout(onFilterChangeFetchTimeoutRef.current);

    setLoading(true);
    setExploration(
      mergeDeepRight({ ...exploration }, {
        exploration: {
          query
        }
      })
    );
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
        <TypographyH1 text={title ?? 'Untitled'} />
        <div className='self-end flex flex-row items-center gap-2'>
          {!disableClientPagination && (
            <div className="flex items-center space-x-2">
              <Label htmlFor="airplane-mode">{t('common.clientPagination')}</Label>
              <Switch 
                checked={isClientPagination} 
                onCheckedChange={(value) => {
                  setIsClientPagination(value);
                  setExploration(mergeDeepRight({ ...exploration }, {
                    exploration: {
                      pagination: { page: 1}
                    }
                  }));
                }}  
              />
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={refreshData}><ReloadIcon /></Button>
          {onNewClick && (
            <Button 
              size="sm" 
              onClick={() => onNewClick()}
            >
              {newBtnText ?? t('common.new')}
            </Button>
          )}
        </div>
      </div>
      <DataTable 
        columns={columns} 
        data={exploration.data} 
        isClientPagination={isClientPagination}
        pagination={exploration.exploration.pagination}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        filterField={filterField}
        filterValue={exploration.exploration.query}
        onFilterChange={setFilterValue}
        actionColumn={actionColumn}
      />
    </>
  );
}

export default withCommonState(Exploration<any>, true);

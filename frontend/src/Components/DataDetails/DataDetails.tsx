import { IMetadataField } from '@/Utils/metadata';
import { Label } from '../ui/label';
import { IAPIEndpoint } from '@/Utils/call-api';
import { useAPI } from '@/Hooks/useApi';
import Page404 from '@/Pages/Error';
import { Loader } from 'lucide-react';
import TypographyH1 from '../Typography/H1';
import { Button } from '../ui/button';

export interface IDataDetails<T> {
  title: string;
  endpoint: IAPIEndpoint;
  fields: IMetadataField<T>[];
  onEditClick?: () => void;
}

function DataDetails<T>({ title, endpoint, fields, onEditClick }: IDataDetails<T>): JSX.Element {
  const { data, loading } = useAPI<T>(endpoint);

  if(!data && !loading) {
    return ( <Page404 /> );
  }

  if(loading) {
    return ( <Loader /> );
  }

  return (
    <>
      <div className='flex flex-row justify-between align-center mb-8'>
        <TypographyH1 text={title ?? 'Untitled'} />
        {onEditClick && (
        <Button 
          size="sm" 
          onClick={() => onEditClick()}
        >
          Edit
        </Button>
      )}
      </div>
      {fields.filter(f => f.accessorKey).map((field, i) => (
        <div key={i} className='flex flex-col gap-[8px] mb-4'>
          <Label className='font-bold text-[18px]'>{field.label}</Label>
          <Label>{(data as any)[field.accessorKey!]}</Label>
        </div>
      ))}
    </>
  );
}

export default DataDetails;

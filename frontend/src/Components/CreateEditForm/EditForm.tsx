import DynamicForm, { IDynamicFormProps } from '../DynamicForm';
import { useAPI } from '@/Hooks/useApi';
import { IAPIEndpoint } from '@/Utils/call-api';
import { generateFormSkeleton } from '../DynamicForm/DynamicForm.service';

export interface IEditFormProps<T> extends IDynamicFormProps<T> {
  getInitialDataEndpoint: IAPIEndpoint;
  getInitialDataReqBody?: Record<string, any>;
}

function EditForm<T>({
  getInitialDataEndpoint,
  getInitialDataReqBody,
  ...props
}: IEditFormProps<T>): JSX.Element {
  const { data, loading } = useAPI<T>(getInitialDataEndpoint, getInitialDataReqBody);
  
  return (
    <>
      {loading || !data ? generateFormSkeleton(props.fields) : (
        <DynamicForm<T>
          {...props}
          initialData={data}
        />
      )}
    </>
  );
}

export default EditForm; 

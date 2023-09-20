/* eslint-disable react-refresh/only-export-components */
import { schedulesFields } from './Schedules.metadata';
import DashboardContentWrapper from '../../../../Components/Wrappers/DashboardContentWrapper';
import withCommonState, { IWithCommonStateProps } from '@/Components/HOC/withCommonState';
import { useParams } from 'react-router-dom';
import { getAPIEndpoint } from '@/Utils/call-api';
import EditForm from '@/Components/CreateEditForm/EditForm';
import CreateForm from '@/Components/CreateEditForm/CreateForm';
import { createSchedule } from './Schedules.service';
import { toast } from 'react-toastify';

interface IScheduleForm extends IWithCommonStateProps {}

function ScheduleForm({ navigate }: IScheduleForm): JSX.Element {
  const { id } = useParams();
  
  const onSubmitData = async (data: Record<string, any>) => {
    await createSchedule(data as any);

    toast.success(`Schedule ${data.name} created successfully!`);
    navigate('/schedules');
  };

  return (
    <DashboardContentWrapper>
      {id ? (
        <EditForm
          getInitialDataEndpoint={getAPIEndpoint(`/schedules/${id}`)}
          fields={schedulesFields}
          onSubmitData={onSubmitData}
        />
      ) : (
        <CreateForm
          fields={schedulesFields}
          onSubmitData={onSubmitData}
        />
      )}
    </DashboardContentWrapper>
  );
}

export default withCommonState(ScheduleForm);

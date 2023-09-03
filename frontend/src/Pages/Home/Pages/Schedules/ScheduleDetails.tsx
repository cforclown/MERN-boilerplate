import DataDetails from '@/Components/DataDetails/DataDetails';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { schedulesFields } from './Schedules.metadata';
import { getAPIEndpoint } from '@/Utils/call-api';
import { useCallback } from 'react';

function ScheduleDetails() {
  const { id: scheduleId } = useParams();
  const navigate = useNavigate();
  const endpoint = getAPIEndpoint('/schedules/'+scheduleId);

  const onEditClick = useCallback(() => navigate('/schedules/form/'+scheduleId), [scheduleId]);

  if(!scheduleId) {
    return (
      <Navigate to="/schedules" />
    );
  }

  return (
    <DataDetails
      title="Schedule"
      endpoint={endpoint}
      fields={schedulesFields}
      onEditClick={onEditClick}
    />
  );
}

export default ScheduleDetails;  

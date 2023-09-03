import DynamicForm from '@/Components/DynamicForm';
import { schedulesFields } from './Schedules.metadata';
import ContentWrapper from '../../Content/ContentWrapper';

function ScheduleForm() {
  return (
    <ContentWrapper>
      <DynamicForm fields={schedulesFields} />
    </ContentWrapper>
  );
}

export default ScheduleForm;

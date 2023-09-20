import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


const Schedules =  React.lazy(() => import('../Pages/Schedules'));
const ScheduleForm =  React.lazy(() => import('../Pages/Schedules/ScheduleForm'));
const ScheduleDetails =  React.lazy(() => import('../Pages/Schedules/ScheduleDetails'));

function Content(): JSX.Element {
  return (
    <div id="content" className="relative w-full h-full overflow-auto">
      <Suspense>
        <Routes>
          <Route path="schedules" element={<Schedules />} />
          <Route path="schedules/details/:id" element={<ScheduleDetails />} />
          <Route path="schedules/form/:id" element={<ScheduleForm />} />
          <Route path="schedules/form" element={<ScheduleForm />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content;

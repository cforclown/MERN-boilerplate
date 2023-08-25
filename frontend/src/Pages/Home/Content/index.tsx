import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Schedules } from '../Pages/Schedules';

function Content(): JSX.Element {
  return (
    <div id="content" className="relative w-full h-full overflow-auto">
      <Suspense>
        <Routes>
          <Route path="schedules" element={<Schedules />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content;

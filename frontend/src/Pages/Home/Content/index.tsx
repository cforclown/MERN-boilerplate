import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ComingSoon from '../../../Components/ComingSoon/ComingSoon.style';

function Content(): JSX.Element {
  return (
    <div id="content" className="relative w-full h-full">
      <Suspense>
        <Routes>
          <Route path="profile" element={<ComingSoon />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Content

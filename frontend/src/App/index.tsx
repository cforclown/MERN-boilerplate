import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import { selectTheme } from '../Store/Reducers/Layout/ThemeSelector';
import Loader from '../Components/Loader/Loader.style';
import Page404 from '../Pages/Error';
import { ITheme } from '../Themes/Themes';
import AlertDialogGlobal from '@/Components/AlertDialogContainer/AlertDialogGlobal';

const App = (): React.ReactElement => {
  const theme: ITheme = useSelector(selectTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen overflow-hidden m-0 p-0">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route key="404" path="404" element={<Page404 fullscreen msg="Page not found" code={404} />} />
            <Route key="home" path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
      <AlertDialogGlobal />
    </ThemeProvider>
  );
};

export default App;

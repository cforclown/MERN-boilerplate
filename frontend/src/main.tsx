import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/index.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Store from './Store';
import './i18n.ts';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
        <ToastContainer theme="colored" newestOnTop autoClose={3000} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

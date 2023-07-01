import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={ <App /> }>
        </Route>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
,
  document.getElementById('root'),
);

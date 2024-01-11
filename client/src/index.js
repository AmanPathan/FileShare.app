import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Show from './pages/Show';
import Download from './pages/Download';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/files/:id' element={<Show />} />
      <Route path='/files/download/:id' element={<Download />} />
    </Routes>
  </BrowserRouter>
);

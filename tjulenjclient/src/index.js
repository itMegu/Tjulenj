import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Main from './vsebina/naslovna';
import Root from './vsebina/root';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>   
        <Route path="/root" element={<Root />} />
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



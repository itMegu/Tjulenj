import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Naslovna from './random quirky stuff/naslovna';
import ListUsluzbencev from './vsebina/ListUsluzbencev';

  const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime > Number(expirationTime)) {
      // Seja je potekla, preusmeri na stran za prijavo
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expirationTime');
      window.location.href = '/login'; // Preusmeri na stran za prijavo
    }
  }, []);

  return isAuthenticated ? (
    <Element {...rest} /> // Prenesi preostale propse na komponento
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const Root = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setAuthenticated(storedAuth === 'true');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes
      localStorage.setItem('expirationTime', expirationTime);
    }
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Naslovna />} />
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/admin/*"
            element={<PrivateRoute element={App} />}
          />
          <Route path="/belezenje" element={<ListUsluzbencev></ListUsluzbencev>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

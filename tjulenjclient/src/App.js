import React, { Fragment, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

//vsebina
import Vnos from './vsebina/vnesiPodatke';
import PrikazPodatkov from './vsebina/prikazPodatkov';
import CasVnos from './vsebina/casVnos';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login'); // Preusmeri na stran za prijavo, če uporabnik ni prijavljen
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/login');
  };

  return (
    <div>
        <Vnos />
        <PrikazPodatkov />
        <CasVnos />
        <div className='container'>
            <div className="button-container">
              <button onClick={handleLogout}>Odjava</button>
            </div>
          </div>
    </div>
  );
}

export default App;

import React, { Fragment } from 'react';
import './App.css';


//vsebina
import Vnos from './vsebina/vnesiPodatke';
import PrikazPodatkov from './vsebina/prikazPodatkov';
import CasVnos from './vsebina/casVnos'

function App() {
  return (
    <Fragment>
      <Vnos />
      <PrikazPodatkov />
      <CasVnos />
    </Fragment>
  );
}


export default App;
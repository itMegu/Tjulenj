import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const PrikazPodatkov = () => {
  const [podatki, setPodatki] = useState([]);

  useEffect(() => {
  const getPodatki = async () => {
    try {
      const response = await axios.get('http://192.168.50.5:5000/ustvaritev');
      setPodatki(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

    getPodatki();
  }, []);

  return (
    <Fragment>
      <h1>Prikaz Test</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Priimek</th>
            <th>Funkcija</th>
          </tr>
        </thead>
        <tbody>
          {podatki.map((podatek, index) => (
            <tr key={index}>
              <td>{podatek.ime}</td>
              <td>{podatek.priimek}</td>
              <td>{podatek.funkcija}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default PrikazPodatkov;
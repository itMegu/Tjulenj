import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import '../styles.css'

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
      <div className="container-prikaz">
        <h1>Usluzbenci: </h1>
        <table className="table">
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
      </div>
    </Fragment>
  );
};

export default PrikazPodatkov;
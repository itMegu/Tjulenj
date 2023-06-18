import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styleUsluzbenci.css';

const ListUsluzbencev = () => {
  const navigate = useNavigate();
  const [usluzbenci, setUsluzbenci] = useState([]);
  const [checkIns, setCheckIns] = useState({});

  useEffect(() => {
    const fetchUsluzbenci = async () => {
      try {
        const response = await axios.get('http://192.168.50.5:5000/ustvaritev');
        setUsluzbenci(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchUsluzbenci();
  }, []);

  useEffect(() => {
    const storedCheckIns = JSON.parse(sessionStorage.getItem('checkIns'));
    if (storedCheckIns) {
      setCheckIns(storedCheckIns);
    }
  }, []);

  const handleCheckInOut = async (usluzbenciId) => {
    const currentTime = new Date().toISOString();
    const updatedCheckIns = { ...checkIns };

    if (updatedCheckIns[usluzbenciId]) {
      delete updatedCheckIns[usluzbenciId];
      try {
        await axios.post('http://192.168.50.5:5000/api/checkout', {
          usluzbenciId,
          checkOutTime: currentTime,
        });
      } catch (error) {
        console.error('Napaka pri odjavi:', error);
      }
    } else {
      updatedCheckIns[usluzbenciId] = true;
      try {
        await axios.post('http://192.168.50.5:5000/api/checkin', {
          usluzbenciId,
          checkInTime: currentTime,
        });
      } catch (error) {
        console.error('Napaka pri prijavi:', error);
      }
    }

    setCheckIns(updatedCheckIns);
    sessionStorage.setItem('checkIns', JSON.stringify(updatedCheckIns));
  };

  const renderButton = (usluzbenciId) => {
    const isCheckedOut = !checkIns[usluzbenciId];
    if (isCheckedOut) {
      return (
        <button onClick={() => handleCheckInOut(usluzbenciId)}>Prihod</button>
      );
    } else {
      return (
        <button onClick={() => handleCheckInOut(usluzbenciId)}>Odhod</button>
      );
    }
  };

  return (
    <div className="container">
      <h1>Prihod / Odhod</h1>
      <div className="employee-grid">
        {usluzbenci.map((usluzbenci) => (
          <div key={usluzbenci.id} className="employee-item">
            <div className="item">Ime: {usluzbenci.ime}</div>
            <div className="item">Priimek: {usluzbenci.priimek}</div>
            <div className="item">Funkcija: {usluzbenci.funkcija}</div>
            <div className="item">ID: {usluzbenci.id}</div>
            <div className="item">{renderButton(usluzbenci.id)}</div>
          </div>
        ))}
      </div>
      <button className="home-button" onClick={() => navigate("/")}>
        Domača stran
      </button>
    </div>
  );
};

export default ListUsluzbencev;

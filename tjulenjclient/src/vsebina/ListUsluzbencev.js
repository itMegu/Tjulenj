import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [checkIns, setCheckIns] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://192.168.50.5:5000/ustvaritev');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const storedCheckIns = JSON.parse(sessionStorage.getItem('checkIns'));
    if (storedCheckIns) {
      setCheckIns(storedCheckIns);
    }
  }, []);

  const handleCheckInOut = async (employeeId) => {
    const currentTime = new Date().toISOString();
    const updatedCheckIns = { ...checkIns };

    if (updatedCheckIns[employeeId]) {
      // Employee already checked in, so it's a check-out
      delete updatedCheckIns[employeeId];
      try {
        await axios.post('http://192.168.50.5:5000/api/checkout', {
          employeeId,
          checkOutTime: currentTime,
        });
      } catch (error) {
        console.error('Error during check-out:', error);
      }
    } else {
      // Employee is checking in
      updatedCheckIns[employeeId] = true;
      try {
        await axios.post('http://192.168.50.5:5000/api/checkin', {
          employeeId,
          checkInTime: currentTime,
        });
      } catch (error) {
        console.error('Error during check-in:', error);
      }
    }

    setCheckIns(updatedCheckIns);
    sessionStorage.setItem('checkIns', JSON.stringify(updatedCheckIns));
  };

  const renderButton = (employeeId) => {
    const isCheckedOut = !checkIns[employeeId];
    if (isCheckedOut) {
      // Employee has checked out or no data available, show check-in button
      return (
        <button onClick={() => handleCheckInOut(employeeId)}>Check In</button>
      );
    } else {
      // Employee has checked in, show check-out button
      return (
        <button onClick={() => handleCheckInOut(employeeId)}>Check Out</button>
      );
    }
  };

  return (
    <div className="container">
      <div className="employee-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-item">
            <div>ID: {employee.id}</div>
            <div>Ime: {employee.ime}</div>
            <div>Priimek: {employee.priimek}</div>
            <div>Funkcija: {employee.funkcija}</div>
            <div>{renderButton(employee.id)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

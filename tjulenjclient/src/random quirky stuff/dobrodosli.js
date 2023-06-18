import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import '../styles.css';

function Dobrodosli() {
  const [time, setTime] = useState(new Date());
  const Navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ura = time.getHours();
  let dobrodosli = '';

  if (ura >= 5 && ura < 10) {
    dobrodosli = 'Dobro jutro';
  } else if (ura >= 10 && ura < 18) {
    dobrodosli = 'Dober dan';
  } else {
    dobrodosli = 'Dober večer';
  }

  const handlePrihodOdhod = () => {
    Navigate('/belezenje');
  };
  const handlePrijava= () => {
    Navigate('/login');
  };

  return (
    <div className='naslov-container'>
      <div>
        <h3>{time.toLocaleDateString()}     {time.toLocaleTimeString()}</h3>
      </div>
      <div>
        <h1>{dobrodosli}!</h1>
      </div>
      <div className="type-animation-container">
        <TypeAnimation
          sequence={[
            'Imej lep dan :)',
            1000,
            'Imej lepo jutro :)',
            1000,
            'Imej lep večer :)',
            1000
          ]}
          wrapper="span"
          speed={35}
          style={{ fontSize: '2em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
      <button className="gumb" onClick={handlePrijava}>
        Prijava kot Admin
      </button>
      <button className="gumb" onClick={handlePrihodOdhod}>
        Prihod / Odhod
      </button>
    </div>
  );
}

export default Dobrodosli;

import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles.css'
function Dobrodosli() {
  const [time, setTime] = useState(new Date());
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

  return (
    <div className='naslov-container'>
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
    </div>
    
  );
}

export default Dobrodosli;
import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>{dobrodosli}!</h1>
    </div>
  );
}

export default Dobrodosli;
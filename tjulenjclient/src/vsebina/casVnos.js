import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CasVnos() {
  const [usluzbenciid, setusluzbenciId] = useState('');
  const [casprihod, setcasPrihod] = useState(null);
  const [casodhoda, setcasOdhoda] = useState(null);
  const [trenutnicas, settrenutniCas] = useState(new Date());
  const [zabelezencas, setzabelezenCas] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      settrenutniCas(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlecasPrihod = async () => {
    try {
      const response = await axios.post('http://192.168.50.5:5000/api/casPrihod', { usluzbenciid });
      setcasPrihod(new Date(response.data.casprihod));
      setzabelezenCas(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handlecasOdhod = async () => {
    try {
      const response = await axios.post('http://192.168.50.5:5000/api/casOdhoda', { usluzbenciid });
      setcasOdhoda(new Date(response.data.casodhoda));
      setzabelezenCas(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <label>
        Usluzbencev id:
        <input type="text" value={usluzbenciid} onChange={(e) => setusluzbenciId(e.target.value)} />
      </label>
      <br />
      <br />
      <div>
        Ura je : {trenutnicas.toLocaleTimeString()}
      </div>
      <br />
      <div>
        {zabelezencas ? (
          <div>
            Čas prihoda: {casprihod.toLocaleString()}
            <br />
            <button onClick={handlecasOdhod}>Odhod</button>
          </div>
        ) : (
          <button onClick={handlecasPrihod}>Prihod</button>
        )}
      </div>
      <br />
      <div>
        {casodhoda && (
          <div>
            Ura odhoda: {casodhoda.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default CasVnos;
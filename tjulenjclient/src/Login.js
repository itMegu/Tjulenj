import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginstyles.css'

const Login = ({ isAuthenticated, setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (storedAuth === 'true' && expirationTime && currentTime < Number(expirationTime)) {
      setAuthenticated(true);
      navigate('/admin');
    }
  }, []);

  const handleChangeEmail = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };
  
    try {
      const response = await fetch(`http://192.168.50.5:5000/api/admin`, requestOptions);
      const data = await response.json();
  
      if (response.ok) {
        const expirationTime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem('expirationTime', expirationTime);
        setAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
        console.log('Prijavljen si kot', username);
      } else {
        setError(data.message || 'Napaka pri prijavi');
      }
    } catch (error) {
      console.error('Napaka pri poizvedbi:', error);
      setError('Napaka pri prijavi');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='signin'>
      <div className='content'>
        <h2>Prijava</h2>
      </div>
      <div className='form'>
        <div className='inputBox'>
          <input type="text" name="Uporabnik" value={username} onChange={handleChangeEmail} required className='user'/>
        </div>
      </div>
      <div class="inputBox">
        <input type="password" name="Uporabnik" value={password} onChange={handleChangePassword} required className='password'/>
      </div>
      <div className='inputBox'>
        <button  type="submit">Prijavi se</button>
      </div>
        {error && <p>{error}</p>}
      </div>
      <button className="home-button" onClick={() => navigate("/")}>
        Domača stran
      </button>
    </form>
  );
};

export default Login;

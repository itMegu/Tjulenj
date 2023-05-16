import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ isAuthenticated, setAuthenticated }) => {
  const [email, setEmail] = useState('');
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
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const users = {
      admin: {
        password: 'admin',
      },
      Aljaz: {
        password: 'Aljaz',
      },
    };

    if (users[email] && users[email].password === password) {
      const expirationTime = new Date().getTime() + 30 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);
      setAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
      console.log('Prijavljen si kot', email);
    } else {
      setError('Napačno uporabniško ime ali geslo');
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleChangeEmail} required />
        </div>
        <div>
          <label>Geslo:</label>
          <input type="password" value={password} onChange={handleChangePassword} required />
        </div>
        <br />
        <button type="submit">Prijavi se</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

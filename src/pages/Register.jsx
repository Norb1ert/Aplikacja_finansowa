import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Zarejestrowano pomyślnie!');
        navigate('/login')
      } else {
        toast.error('Błąd: ' + (data.error || 'Rejestracja nie powiodła się'));
      }
    } catch (err) {
      console.error('Błąd sieci:', err);
    }
  };

  return (
    <div className='register-form-container'>
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit} className="form-inputs">
        <input
          placeholder="Imię"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-form"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-form"
        />
        <input
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-form"
        />
        <button type="submit" className='register-button'>Zarejestruj</button>
        <p>
        Jesteś juz uzytkownikiem? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
}

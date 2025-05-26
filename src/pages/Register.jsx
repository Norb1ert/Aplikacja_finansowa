import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

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
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className='register-form-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-inputs">
        <input
          placeholder="Name"
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
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-form"
        />
        <button type="submit" className='register-button' disabled={loading}> {loading ? "Registering user..." : "Register"}</button>
        <p>
        Already a user? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

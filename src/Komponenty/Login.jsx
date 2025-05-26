import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Login() {
  const API = import.meta.env.VITE_API_URL;
  const [loading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        toast.success(data.message);
        navigate('/app/budget'); 
      } else {
        toast.error("Błąd logowania");
      }
    } catch (err){
      toast.error("Wystąpił błąd: " + err.message);
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <div className='login-container'>
      <h1>Log in</h1>
      <form onSubmit={handleLogin} className="form-inputs-l">
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
        <button type="submit" className='login-button' disabled={loading}> {loading ? 'Logging in...' : "Log in"}</button>
      </form>
    </div>
  );
}

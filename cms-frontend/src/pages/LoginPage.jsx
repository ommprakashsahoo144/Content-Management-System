import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveAuth } from '../utils/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        saveAuth(data.token, data.user);
        // Redirect based on role
       if (data.user.role === 'ADMIN') {
            navigate('/admin');
        } else if (data.user.role === 'AUTHOR') {
          navigate('/author');
      } else {
       navigate('/reader');
     }

      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/register">New user? Register</Link> <br />
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
}

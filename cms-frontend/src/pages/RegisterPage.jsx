import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'READER'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <input name="firstName" placeholder="First Name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="col">
            <input name="lastName" placeholder="Last Name" className="form-control" onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <input name="email" type="email" placeholder="Email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input name="mobileNumber" placeholder="Mobile Number" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input name="password" type="password" placeholder="Password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <select name="role" className="form-select" value={form.role} onChange={handleChange}>
            <option value="AUTHOR">Author</option>
            <option value="READER">Reader</option>
          </select>
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

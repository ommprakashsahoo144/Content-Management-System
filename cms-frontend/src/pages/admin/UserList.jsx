import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', mobileNumber: '', role: 'AUTHOR' });

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      fetchUsers();
      setForm({ firstName: '', lastName: '', email: '', password: '', mobileNumber: '', role: 'AUTHOR' });
    }
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h5>Manage Users</h5>
      <form className="mb-3" onSubmit={createUser}>
        <div className="row">
          {['firstName', 'lastName', 'email', 'mobileNumber', 'password'].map((field) => (
            <div className="col-md-2" key={field}>
              <input
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field}
                className="form-control"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="col-md-2">
            <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="AUTHOR">Author</option>
              <option value="READER">Reader</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">Create</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th><th>Name</th><th>Role</th><th>Mobile</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.role}</td>
              <td>{u.mobileNumber}</td>
              <td>
                {u.role !== 'ADMIN' && (
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

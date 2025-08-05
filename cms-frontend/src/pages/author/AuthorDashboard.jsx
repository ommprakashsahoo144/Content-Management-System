import { useEffect, useState } from 'react';
import { getToken, getUserFromToken } from '../../utils/auth';

export default function AuthorDashboard() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);
  const user = getUserFromToken();

  // Fetch own articles
  const fetchArticles = async () => {
    const res = await fetch('http://localhost:5000/api/articles/author', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:5000/api/articles/${editId}`
      : `http://localhost:5000/api/articles`;
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      fetchArticles();
      setForm({ title: '', content: '' });
      setEditId(null);
    }
  };

  const handleEdit = (article) => {
    setForm({ title: article.title, content: article.content });
    setEditId(article.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/articles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchArticles();
  };

  const handleSubmitForReview = async (id) => {
    await fetch(`http://localhost:5000/api/articles/${id}/submit`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchArticles();
  };

  return (
    <div className="container mt-4">
      <h4>Welcome, {user.firstName}</h4>
      <h5>{editId ? 'Edit Article' : 'Create New Article'}</h5>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            name="title"
            placeholder="Article Title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            name="content"
            placeholder="Article Content"
            className="form-control"
            rows="5"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">{editId ? 'Update' : 'Create'}</button>
      </form>

      <h5>My Articles</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>
                {article.status === 'DRAFT' && (
                  <>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(article)}>Edit</button>
                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(article.id)}>Delete</button>
                    <button className="btn btn-sm btn-success" onClick={() => handleSubmitForReview(article.id)}>Submit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

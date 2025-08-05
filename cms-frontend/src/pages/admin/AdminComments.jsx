import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});

  const fetchComments = async () => {
    const res = await fetch('http://localhost:5000/api/comments/all', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setComments(data);
  };

  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value });
  };

  const handleReplySubmit = async (parentId) => {
    await fetch('http://localhost:5000/api/comments/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ content: replies[parentId], parentId }),
    });
    setReplies({ ...replies, [parentId]: '' });
    fetchComments();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="container mt-4">
      <h4>Admin Comment Moderation</h4>
      {comments.length === 0 ? <p>No comments.</p> : (
        <ul className="list-group">
          {comments.map(c => (
            <li className="list-group-item" key={c.id}>
              <strong>{c.User.firstName}</strong> on <em>{c.Article.title}</em><br />
              {c.content}

              <div className="mt-2">
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(c.id)}>Delete</button>
                <input
                  type="text"
                  placeholder="Reply as admin"
                  className="form-control d-inline-block w-50 me-2"
                  value={replies[c.id] || ''}
                  onChange={(e) => handleReplyChange(c.id, e.target.value)}
                />
                <button className="btn btn-primary btn-sm" onClick={() => handleReplySubmit(c.id)}>Reply</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getToken, getUserFromToken } from '../../utils/auth';

export default function ReaderDashboard() {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const user = getUserFromToken();

  // Fetch published articles
  const fetchArticles = async () => {
    const res = await fetch('http://localhost:5000/api/articles/published/all', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setArticles(data);
  };

  const handleLike = async (articleId) => {
    const res = await fetch(`http://localhost:5000/api/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ articleId })
    });
    if (res.ok) fetchArticles();
  };

  const handleCommentChange = (articleId, value) => {
    setComments({ ...comments, [articleId]: value });
  };

  const handleSubmitComment = async (articleId) => {
    const res = await fetch(`http://localhost:5000/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ articleId, content: comments[articleId] })
    });
    if (res.ok) {
      setComments({ ...comments, [articleId]: '' });
      fetchArticles();
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mt-4">
      <h4>Welcome, {user.firstName}</h4>
      <h5>Published Articles</h5>
      {articles.map(article => (
        <div key={article.id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p>{article.content}</p>

            <div className="d-flex align-items-center mb-2">
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleLike(article.id)}>👍 Like</button>
              <span>{article.Likes?.length || 0} Likes</span>
            </div>

            <div>
              <textarea
                className="form-control mb-2"
                placeholder="Write a comment..."
                value={comments[article.id] || ''}
                onChange={(e) => handleCommentChange(article.id, e.target.value)}
              />
              <button className="btn btn-success btn-sm" onClick={() => handleSubmitComment(article.id)}>Submit Comment</button>
            </div>

            <hr />
            <h6>Comments</h6>
   {(article.Comments || []).map(comment => (
  <div key={comment.id} className="mb-3 p-2 border rounded">
    <strong>{comment.User?.firstName}:</strong> {comment.content}

    {/* Show Replies (if any) */}
    {(comment.Replies || []).length > 0 && (
      <div className="ms-4 mt-2 p-2 bg-light rounded">
        <strong>{comment.Replies[0]?.User?.firstName} (Admin):</strong> {comment.Replies[0]?.content}
      </div>
    )}
  </div>
))}

          </div>
        </div>
      ))}
    </div>
  );
}

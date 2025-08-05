import { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';

export default function ArticleReview() {
  const [articles, setArticles] = useState([]);

  const fetchSubmittedArticles = async () => {
    const res = await fetch('http://localhost:5000/api/articles/published/all', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    const submitted = data.filter(a => a.status === 'SUBMITTED');
    setArticles(submitted);
  };

  const review = async (id, status) => {
    await fetch(`http://localhost:5000/api/articles/${id}/review`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchSubmittedArticles();
  };

  useEffect(() => {
    fetchSubmittedArticles();
  }, []);

  return (
    <div>
      <h5>Submitted Articles for Review</h5>
      {articles.length === 0 ? (
        <p>No submitted articles.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th><th>Author</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author?.firstName}</td>
                <td>{article.status}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => review(article.id, 'APPROVED')}>Approve</button>
                  <button className="btn btn-danger btn-sm" onClick={() => review(article.id, 'REJECTED')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

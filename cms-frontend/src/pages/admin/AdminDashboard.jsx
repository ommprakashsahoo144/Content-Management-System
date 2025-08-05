import { useState } from 'react';
import UserList from './UserList';
import ArticleReview from './ArticleReview';
import AdminComments from './AdminComments';

export default function AdminDashboard() {
  const [tab, setTab] = useState('users');

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>
      <div className="btn-group mb-3">
        <button className={`btn btn-outline-primary ${tab === 'users' && 'active'}`} onClick={() => setTab('users')}>Manage Users</button>
        <button className={`btn btn-outline-primary ${tab === 'articles' && 'active'}`} onClick={() => setTab('articles')}>Review Articles</button>
        <button className={`btn btn-outline-primary ${tab === 'comments' && 'active'}`} onClick={() => setTab('comments')}>Moderate Comments</button>
      </div>

      {tab === 'users' && <UserList />}
      {tab === 'articles' && <ArticleReview />}
      {tab === 'comments' && <AdminComments />}
    </div>
  );
}

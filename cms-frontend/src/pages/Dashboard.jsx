import { getUserFromToken } from '../utils/auth';
import AdminDashboard from './admin/AdminDashboard';

export default function Dashboard() {
  const user = getUserFromToken();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>Dashboard</h3>
      {user.role === 'ADMIN' && <AdminDashboard />}
      {/* Add more role UIs here: AuthorDashboard, ReaderDashboard */}
    </div>
  );
}

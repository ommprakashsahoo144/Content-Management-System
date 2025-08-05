import { Link } from 'react-router-dom';
import { getUserFromToken, logout } from '../utils/auth';

export default function Navbar() {
  const user = getUserFromToken();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">CMS</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {user && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
        </ul>
        <ul className="navbar-nav ml-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </li>
          ) : (
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

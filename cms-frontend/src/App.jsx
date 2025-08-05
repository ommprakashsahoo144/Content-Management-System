import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthorDashboard from './pages/author/AuthorDashboard.jsx';
import ReaderDashboard from './pages/reader/ReaderDashboard.jsx';
import Navbar from './components/Navbar';
import { getUserFromToken } from './utils/auth';
import AdminComments from './pages/admin/AdminComments';
import AdminDashboard from './pages/admin/AdminDashboard';


function App() {
  const user = getUserFromToken();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/author" element={<AuthorDashboard />} />


        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/author" element={user?.role !== 'READER' ? <AuthorDashboard /> : <Navigate to="/login" />} />
        <Route path="/reader" element={user?.role === 'READER' ? <ReaderDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/comments" element={user?.role === 'ADMIN' ? <AdminComments /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;

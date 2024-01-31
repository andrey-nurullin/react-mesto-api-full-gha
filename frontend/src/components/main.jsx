import { Navigate, Routes, Route } from 'react-router-dom';
import MainContent from './main-content';
import Login from './login';
import ProtectedRoute from './protected-route';
import Register from './register';

function Main() {
  return (
    <main className="main">
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<ProtectedRoute element={MainContent} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default Main;

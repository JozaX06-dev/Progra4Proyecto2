import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" state={{ mensaje: 'Debe iniciar sesión para acceder.' }} />;
    return <>{children}</>;
}

export default ProtectedRoute;
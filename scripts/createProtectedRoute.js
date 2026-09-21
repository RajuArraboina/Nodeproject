const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../../frontend/frontend/src/components');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const protectedRouteCode = `import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../Loading';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="state-message error-message" style={{ margin: '40px auto', maxWidth: '600px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
        <a href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>
          Return to Home
        </a>
      </div>
    );
  }

  return children;
}
`;

const filePath = path.join(targetDir, 'ProtectedRoute.jsx');
fs.writeFileSync(filePath, protectedRouteCode, 'utf8');
console.log('Successfully created src/components/ProtectedRoute.jsx!');

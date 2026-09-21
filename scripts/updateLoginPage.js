const fs = require('fs');
const path = require('path');

const loginPath = path.resolve(__dirname, '../../frontend/frontend/src/Login.jsx');

const loginContent = `import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/restaurants';

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^\\S+@\\S+\\.\\S+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrors({});
    setServerError('');
  };

  return (
    <div className="auth-page-container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 120px)' }}>
      <div className="auth-card" style={{ maxWidth: '460px', margin: '0 auto' }}>
        {/* Brand Header */}
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              fontSize: '26px',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(234, 88, 12, 0.3)',
            }}
          >
            🍽️
          </div>
          <h1 className="auth-title" style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
            Welcome Back
          </h1>
          <p className="auth-subtitle" style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>
            Sign in to manage restaurants, order food, and track deliveries.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div
            className="alert-banner error"
            role="alert"
            style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>⚠️</span>
            <span>{serverError}</span>
          </div>
        )}

        {/* Quick Demo Fill Buttons */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ⚡ Quick Fill Credentials:
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              onClick={() => fillCredentials('raju@gmail.com', '12345678')}
              style={{
                background: '#ffedd5',
                border: '1px solid #fed7aa',
                color: '#c2410c',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                transition: 'all 0.2s',
              }}
            >
              <span>👑 Fill Admin</span>
              <small style={{ fontSize: '0.72rem', color: '#ea580c', opacity: 0.85 }}>raju@gmail.com</small>
            </button>

            <button
              type="button"
              onClick={() => fillCredentials('king@gmail.com', '12345678')}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.84rem',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                transition: 'all 0.2s',
              }}
            >
              <span>👤 Fill Customer</span>
              <small style={{ fontSize: '0.72rem', color: '#64748b', opacity: 0.85 }}>king@gmail.com</small>
            </button>
          </div>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. raju@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              className={errors.email ? 'form-input is-invalid' : 'form-input'}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.email ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                outline: 'none',
                background: errors.email ? '#fff5f5' : '#ffffff',
              }}
              required
            />
            {errors.email && (
              <span className="error-text" style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
                Password
              </label>
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ea580c',
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>

            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              className={errors.password ? 'form-input is-invalid' : 'form-input'}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.password ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                outline: 'none',
                background: errors.password ? '#fff5f5' : '#ffffff',
              }}
              required
            />
            {errors.password && (
              <span className="error-text" style={{ color: '#dc2626', fontSize: '0.82rem', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: '800',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.75 : 1,
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer info & Register link */}
        <div className="auth-footer" style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '0.92rem', color: '#64748b', margin: '0 0 16px' }}>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-link" style={{ color: '#ea580c', fontWeight: '700' }}>
              Create an account
            </Link>
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '12px 14px',
              fontSize: '0.82rem',
              color: '#475569',
              lineHeight: 1.6,
              textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💡</span>
              <span>Available Database Accounts:</span>
            </div>
            <div>
              👑 <strong>Admin:</strong> <code>raju@gmail.com</code> | Password: <code>12345678</code>
            </div>
            <div>
              👤 <strong>Customer:</strong> <code>king@gmail.com</code> | Password: <code>12345678</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(loginPath, loginContent, 'utf8');
console.log('Successfully upgraded Login.jsx with proper prompts and Quick-Fill buttons!');

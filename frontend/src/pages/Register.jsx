import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, adminSecret: isAdminAuth ? adminSecret : undefined })
      });
      const data = await res.json();
      
      if (res.ok) {
        login(data, data.token);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submitHandler} className="auth-form">
        <h2>{isAdminAuth ? 'Register as Admin' : 'Create an Account'}</h2>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: isAdminAuth ? '0.5rem' : '1rem' }}>
          <input 
            type="checkbox" 
            id="isAdminAuth" 
            checked={isAdminAuth} 
            onChange={(e) => setIsAdminAuth(e.target.checked)} 
          />
          <label htmlFor="isAdminAuth" style={{ margin: 0, cursor: 'pointer' }}>Register as Administrator</label>
        </div>

        {isAdminAuth && (
          <div className="form-group">
            <label>Admin Secret Key</label>
            <input 
              type="password" 
              value={adminSecret} 
              onChange={(e) => setAdminSecret(e.target.value)} 
              required
              placeholder="Enter secret key..."
              className="form-control"
            />
          </div>
        )}

        <button type="submit" className="btn-primary w-100">{isAdminAuth ? 'Register Admin' : 'Register'}</button>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

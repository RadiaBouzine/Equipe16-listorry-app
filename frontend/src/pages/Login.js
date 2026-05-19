import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: '3rem' }}>
      <div className="card">
        <h2>{t('login')}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>{t('email')}</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>{t('password')}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">{t('login')}</button>
        </form>
        <p style={{ marginTop: '1rem' }}>{t('no_account')} <Link to="/register">{t('register')}</Link></p>
        <button style={{ background: '#db4437', marginTop: '1rem' }} onClick={() => alert('Google login à configurer')}>
          {t('google_login')}
        </button>
      </div>
    </div>
  );
}
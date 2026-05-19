import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <nav style={{ background: '#2c7da0', padding: '0.8rem', display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>{t('dashboard')}</Link>
        <Link to="/tasks" style={{ color: 'white', textDecoration: 'none' }}>{t('tasks')}</Link>
        <Link to="/statistics" style={{ color: 'white', textDecoration: 'none' }}>{t('statistics')}</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>{t('profile')}</Link>
        <Link to="/language" style={{ color: 'white', textDecoration: 'none' }}>{t('language')}</Link>
      </div>
      <button onClick={logout} style={{ background: '#1f5e7e' }}>{t('logout')}</button>
    </nav>
  );
}
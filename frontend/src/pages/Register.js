import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '', confirmPassword: '', langue: 'fr' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      await register({ nom: form.nom, prenom: form.prenom, email: form.email, password: form.password, langue: form.langue });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: '2rem' }}>
      <div className="card">
        <h2>{t('register')}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>{t('nom')}</label>
          <input name="nom" value={form.nom} onChange={handleChange} required />
          <label>{t('prenom')}</label>
          <input name="prenom" value={form.prenom} onChange={handleChange} required />
          <label>{t('email')}</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>{t('password')}</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>{t('confirm_password')}</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          <label>Langue</label>
          <select name="langue" value={form.langue} onChange={handleChange}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <button type="submit">{t('register')}</button>
        </form>
        <p><Link to="/login">{t('login')}</Link></p>
      </div>
    </div>
  );
}
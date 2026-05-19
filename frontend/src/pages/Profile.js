import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState({ nom: user?.nom || '', prenom: user?.prenom || '', email: user?.email || '', langue: user?.langue || 'fr' });
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      setMessage('Profil mis à jour');
    } catch (err) {
      setMessage('Erreur');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    try {
      await changePassword(passwords.old, passwords.new);
      setMessage('Mot de passe changé');
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3>{t('profile')}</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleProfileUpdate}>
          <label>{t('nom')}</label>
          <input value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} />
          <label>{t('prenom')}</label>
          <input value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} />
          <label>{t('email')}</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <label>{t('language')}</label>
          <select value={form.langue} onChange={e => setForm({...form, langue: e.target.value})}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <button type="submit">{t('save')}</button>
        </form>
      </div>

      <div className="card">
        <h3>Changer mot de passe</h3>
        <form onSubmit={handlePasswordChange}>
          <label>Ancien mot de passe</label>
          <input type="password" value={passwords.old} onChange={e => setPasswords({...passwords, old: e.target.value})} required />
          <label>Nouveau mot de passe</label>
          <input type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} required />
          <label>Confirmer</label>
          <input type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
          <button type="submit">Changer</button>
        </form>
      </div>
    </div>
  );
}
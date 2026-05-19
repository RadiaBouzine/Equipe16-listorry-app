import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export default function Language() {
  const { i18n } = useTranslation();
  const { updateProfile, user } = useAuth();

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng);
    if (user) {
      await updateProfile({ langue: lng });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h3>Langue / Language</h3>
        <button onClick={() => changeLanguage('fr')}>Français</button>
        <button onClick={() => changeLanguage('en')}>English</button>
      </div>
    </div>
  );
}
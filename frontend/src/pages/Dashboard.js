import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [stats, setStats] = useState({ en_cours: 0, terminees: 0, en_attente: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Bienvenue {user?.prenom} {user?.nom}</h1>
      <div className="grid-2">
        <div className="card">
          <h3>{t('tasks')}</h3>
          <p>📋 En cours : {stats.en_cours || 0}</p>
          <p>✅ Terminées : {stats.terminees || 0}</p>
          <p>⏳ En attente : {stats.en_attente || 0}</p>
        </div>
        <div className="card">
          <h3>Actions rapides</h3>
          <button onClick={() => window.location.href='/tasks'}>➕ {t('create_task')}</button>
        </div>
      </div>
    </div>
  );
}
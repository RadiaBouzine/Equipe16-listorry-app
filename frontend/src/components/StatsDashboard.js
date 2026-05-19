// Composant Dashboard des statistiques
import React from 'react';

const StatsDashboard = ({ stats }) => {
  return (
    <div className="stats-dashboard">
      <h3>Mes statistiques</h3>
      <div className="stats-grid">
        <div className="stat-card">En cours: {stats.en_cours || 0}</div>
        <div className="stat-card">Terminées: {stats.terminees || 0}</div>
        <div className="stat-card">En attente: {stats.en_attente || 0}</div>
      </div>
    </div>
  );
};
export default StatsDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Statistics() {
  const [stats, setStats] = useState({ en_cours: 0, terminees: 0, en_attente: 0 });
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks/stats')
      .then(res => setStats(res.data));
  }, []);

  const data = {
    labels: [t('in_progress'), t('completed'), t('pending')],
    datasets: [{
      data: [stats.en_cours || 0, stats.terminees || 0, stats.en_attente || 0],
      backgroundColor: ['#ffc107', '#28a745', '#17a2b8']
    }]
  };

  return (
    <div className="container">
      <div className="card">
        <h3>{t('statistics')}</h3>
        <div style={{ width: '300px', margin: '0 auto' }}>
          <Pie data={data} />
        </div>
        <ul>
          <li>{t('in_progress')} : {stats.en_cours}</li>
          <li>{t('completed')} : {stats.terminees}</li>
          <li>{t('pending')} : {stats.en_attente}</li>
        </ul>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ titre: '', description: '', categorie: 'daily', date_echeance: '', priorite: 'medium', statut: 'en_attente' });
  const [editingId, setEditingId] = useState(null);
  const { t } = useTranslation();

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/tasks/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/tasks', form);
    }
    setForm({ titre: '', description: '', categorie: 'daily', date_echeance: '', priorite: 'medium', statut: 'en_attente' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ?')) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({ titre: task.titre, description: task.description, categorie: task.categorie, date_echeance: task.date_echeance.slice(0,16), priorite: task.priorite, statut: task.statut });
  };

  const getTimeLeft = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return 'Expirée';
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (86400000))/3600000);
    return `${days}j ${hours}h`;
  };

  return (
    <div className="container">
      <div className="card">
        <h3>{editingId ? 'Modifier' : t('create_task')}</h3>
        <form onSubmit={handleSubmit}>
          <label>{t('title')}</label>
          <input value={form.titre} onChange={e => setForm({...form, titre: e.target.value})} required />
          <label>{t('description')}</label>
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <label>{t('category')}</label>
          <select value={form.categorie} onChange={e => setForm({...form, categorie: e.target.value})}>
            <option value="daily">{t('daily')}</option>
            <option value="weekly">{t('weekly')}</option>
            <option value="monthly">{t('monthly')}</option>
          </select>
          <label>{t('due_date')}</label>
          <input type="datetime-local" value={form.date_echeance} onChange={e => setForm({...form, date_echeance: e.target.value})} required />
          <label>{t('priority')}</label>
          <select value={form.priorite} onChange={e => setForm({...form, priorite: e.target.value})}>
            <option value="low">{t('low')}</option>
            <option value="medium">{t('medium')}</option>
            <option value="high">{t('high')}</option>
          </select>
          <label>{t('status')}</label>
          <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})}>
            <option value="en_attente">{t('pending')}</option>
            <option value="en_cours">{t('in_progress')}</option>
            <option value="terminee">{t('completed')}</option>
          </select>
          <button type="submit">{t('save')}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ titre:'', description:'', categorie:'daily', date_echeance:'', priorite:'medium', statut:'en_attente' }); }}>Annuler</button>}
        </form>
      </div>

      <div className="card">
        <h3>{t('tasks')}</h3>
        {tasks.map(task => (
          <div key={task.id} style={{ borderBottom: '1px solid #eee', padding: '0.8rem 0' }}>
            <strong>{task.titre}</strong> - {task.categorie} - {task.priorite}
            <p>{task.description}</p>
            <small>Échéance : {new Date(task.date_echeance).toLocaleString()} | ⏳ {getTimeLeft(task.date_echeance)}</small>
            <div>
              <button onClick={() => handleEdit(task)}>{t('edit')}</button>
              <button onClick={() => handleDelete(task.id)} style={{ background: '#dc3545', marginLeft: '0.5rem' }}>{t('delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

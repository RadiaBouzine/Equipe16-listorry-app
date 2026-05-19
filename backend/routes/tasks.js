const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findByUser(req.userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titre, description, categorie, date_echeance, priorite, statut } = req.body;
    if (!titre || !categorie || !date_echeance) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }
    const taskId = await Task.create({
      user_id: req.userId,
      titre,
      description,
      categorie,
      date_echeance,
      priorite: priorite || 'medium',
      statut: statut || 'en_attente'
    });
    res.status(201).json({ id: taskId, message: 'Tâche créée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.update(req.params.id, req.userId, req.body);
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche mise à jour' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.delete(req.params.id, req.userId);
    if (!deleted) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await Task.getStats(req.userId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { nom, prenom, email, langue } = req.body;
    await User.update(req.userId, { nom, prenom, email, langue });
    res.json({ message: 'Profil mis à jour' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await User.changePassword(req.userId, oldPassword, newPassword);
    res.json({ message: 'Mot de passe changé' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
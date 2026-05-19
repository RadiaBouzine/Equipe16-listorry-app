const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const { nom, prenom, email, password, langue = 'fr' } = user;
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (nom, prenom, email, password, langue) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, hashed, langue]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    if (data.nom) { fields.push('nom = ?'); values.push(data.nom); }
    if (data.prenom) { fields.push('prenom = ?'); values.push(data.prenom); }
    if (data.email) { fields.push('email = ?'); values.push(data.email); }
    if (data.langue) { fields.push('langue = ?'); values.push(data.langue); }
    if (fields.length === 0) return false;
    values.push(id);
    await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    return true;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT id, nom, prenom, email, langue FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = User;
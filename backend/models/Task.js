const db = require('../config/db');

class Task {
  static async create(task) {
    const { user_id, titre, description, categorie, date_echeance, priorite, statut } = task;
    const [result] = await db.query(
      `INSERT INTO tasks (user_id, titre, description, categorie, date_echeance, priorite, statut)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, titre, description, categorie, date_echeance, priorite, statut]
    );
    return result.insertId;
  }

  static async findByUser(userId, filters = {}) {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];
    if (filters.categorie) {
      query += ' AND categorie = ?';
      params.push(filters.categorie);
    }
    if (filters.statut) {
      query += ' AND statut = ?';
      params.push(filters.statut);
    }
    query += ' ORDER BY date_echeance ASC';
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async update(id, userId, data) {
    const fields = [];
    const values = [];
    if (data.titre) { fields.push('titre = ?'); values.push(data.titre); }
    if (data.description) { fields.push('description = ?'); values.push(data.description); }
    if (data.categorie) { fields.push('categorie = ?'); values.push(data.categorie); }
    if (data.date_echeance) { fields.push('date_echeance = ?'); values.push(data.date_echeance); }
    if (data.priorite) { fields.push('priorite = ?'); values.push(data.priorite); }
    if (data.statut) { fields.push('statut = ?'); values.push(data.statut); }
    if (fields.length === 0) return false;
    values.push(id, userId);
    const [result] = await db.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    return result.affectedRows > 0;
  }

  static async getStats(userId) {
    const [rows] = await db.query(
      `SELECT 
        SUM(statut = 'en_cours') as en_cours,
        SUM(statut = 'terminee') as terminees,
        SUM(statut = 'en_attente') as en_attente,
        COUNT(*) as total
       FROM tasks WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }
}

module.exports = Task;
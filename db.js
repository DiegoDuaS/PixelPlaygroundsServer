const pool = require('./conn.js');

async function posts() {
    try {
        const { rows } = await pool.query('SELECT * FROM Posts');
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

module.exports = {
    posts
}
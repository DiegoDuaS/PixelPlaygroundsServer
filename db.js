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

async function createpost(name, release_date, description, image) {
    try {
        const query = 'INSERT INTO Posts (name, release_date, description, image) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [name, release_date, description, image]);
  
        const { rows } = await pool.query('SELECT * FROM posts WHERE name = $1', [name]);
        return rows;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function deletepost(id) {
    try {
        const query = 'DELETE FROM posts WHERE Post_id = $1';
        await pool.query(query, [id]);
        return 'Post Deleted';

    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function getpost(id) {
    try {
        const query = 'SELECT * FROM Posts WHERE post_id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows;

    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}

async function updatePost(id, newName, newReleaseDate, newDescription, newImage) {
    try {
        const query = 'UPDATE Posts SET name = $1, release_date = $2, description = $3, image = $4 WHERE post_id = $5;';
        await pool.query(query, [newName, newReleaseDate, newDescription, newImage, id]);
        return 'Post Updated';

    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
}



module.exports = {
    posts,
    createpost,
    deletepost,
    getpost,
    updatePost
}
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3002;

const {posts} = require('./db.js');

app.get('/posts', async (req, res) => {
    try {
      const result = await posts();
      return res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`)
  })
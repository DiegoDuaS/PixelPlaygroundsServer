import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { generateToken, validateToken } from './jwt.js';
import { posts, createpost, deletepost, getpost, updatePost, login } from './db.js'

const PORT = process.env.PORT || 3002;

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', async (req, res) => {
  try {
    const result = await posts();
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/createpost', async (req, res) => {
  const { name, release_date, description, image } = req.body;

  if (!name || !release_date || !description || !image) {
    return res.status(400).json({ error: 'Todos los parametros son requeridos' });
  }

  try {
    const newPost = await createpost(name, release_date, description, image);

    if (newPost) {
      return res.json(newPost);
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /createpost:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/deletepost', async (req, res) => {
  const { post_id } = req.body;

  if (!post_id) {
    return res.status(400).json({ error: 'El id del post es requerido' });
  }

  try {
    const PostD = await deletepost(post_id);

    if (deletepost) {
      return res.status(200).json(PostD);
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /deletepost:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/getpost', async (req, res) => {
  const { id_post } = req.body;

  if (!id_post) {
    return res.status(400).json({ error: 'El id del post es requerido' });
  }

  try {
    const post = await getpost(id_post);

    if (getpost) {
      return res.json(post);
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /getpost:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/updatepost', async (req, res) => {
  const { id_post, name, release_date, description, image } = req.body;

  if (!id_post || !name || !release_date || !description || !image) {
    return res.status(400).json({ error: 'Todos los parametros son requeridos' });
  }

  try {
    const newPost = await updatePost(id_post, name, release_date, description, image);

    if (newPost) {
      return res.json(newPost);
    } else {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en /updatepost:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/login', async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: 'ID y password son requeridos' });
  }

  try {
    const success = await login(user, password);

    if (success) {
      const token = generateToken(user)
      console.log(token)
      return res.status(200).json({ success: true, access_token: token })
    } else {
      return res.status(401).json({ success: false });
    }
  } catch (err) {
    console.error('Error en /login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`)
})

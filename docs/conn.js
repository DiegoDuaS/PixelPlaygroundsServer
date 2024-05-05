import pkg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pkg
dotenv.config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
})

pool.connect((err) => {
  if (err) {
    console.log('Error connecting to Postgres:', err)
  } else {
    console.log('Connected to Postgres')
  }
})

export default pool

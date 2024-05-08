import pkg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pkg
dotenv.config()

const pool = new Pool({
  connectionString: "postgres://default:nfkSJbcP9C0z@ep-delicate-cake-a5lfz55z-pooler.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"
})

pool.connect((err) => {
  if (err) {
    console.log('Error connecting to Postgres:', err)
  } else {
    console.log('Connected to Postgres')
  }
})

export default pool

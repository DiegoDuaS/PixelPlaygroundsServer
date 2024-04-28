const { Pool } = require('pg');
const dotenv = require('dotenv');
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


module.exports = pool


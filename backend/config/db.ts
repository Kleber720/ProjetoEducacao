import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

dotenv.config();

const pool:Pool=createPool({
   host: process.env.DB_HOST || '127.0.0.1',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || 'kleber',
   database: process.env.DB_NAME || 'edukation',
   waitForConnections: true,
   connectionLimit: 10,  
})


async function testarConexao() {
  try {
    const connection = await pool.getConnection();
    console.log('Conection established successfully.');
    
    connection.release(); 
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw new Error('Error connecting to the database ');
  }
}

testarConexao()

export default pool;
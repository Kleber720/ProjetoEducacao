import dotenv from 'dotenv';
import { createPool, Pool } from 'mysql2/promise';

dotenv.config();

const pool:Pool=createPool({
   host: process.env.DB_HOST || '127.0.0.1',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME || 'edukation',
   waitForConnections: true,
   connectionLimit: 10,  
})


async function testarConexao() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    connection.release(); 
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw new Error('Erro ao conectar ao banco de dados');
  }
}

testarConexao()

export default pool;
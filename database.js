import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'notes_app',
  })
  .promise();

export const getNotes = async () => {
  const [results] = await pool.query('SELECT * FROM notes');
  return results;
};
export const getNote = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return rows[0];
};

export const createNote = async (title, contents) => {
  const [result] = await pool.query(
    `INSERT INTO notes (title, contents) VALUES (?,?)`,
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
};

// console.log(await getNotes());
// console.log(await getNote(2));
// console.log(await createNote('NOTE 4', 'Wash Dishes'));

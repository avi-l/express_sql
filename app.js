import express from 'express';
import dotenv from 'dotenv';
import { getNotes, getNote, createNote } from './database.js';
dotenv.config();
const app = express();
app.use(express.json());
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`server running on ${process.env.EXPRESS_PORT}`);
});

app.get('/notes', async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post('/notes', async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});

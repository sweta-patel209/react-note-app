import express from 'express';
import { getAllNotes, create, removeNote, updateNote } from '../controllers/note.controller';

const router = express.Router();




router.get('/getallnotes', getAllNotes);

router.post('/savenote', create);

router.delete('/:id', removeNote);

router.put('/:id',updateNote);
//router.post('/signin',signin)

export default router;
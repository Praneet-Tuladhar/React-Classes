const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

const validateNoteInput = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    next();
};

const notesFilePath = path.join(__dirname, 'notes.json');

const readNotes = () => JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
const writeNotes = (notes) => fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));

app.get('/notes', (req, res) => res.json(readNotes()));

app.get('/notes/:id', (req, res) => {
    res.send('Welcome to the Notes API');
    const note = readNotes().find(n => n.id === parseInt(req.params.id));
    note ? res.json(note) : res.status(404).json({ error: 'Note not found' });
});

app.post('/notes', validateNoteInput, (req, res) => {
    const notes = readNotes();
    const newNote = { id: Date.now(), title: req.body.title, content: req.body.content };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
});

app.put('/notes/:id', validateNoteInput, (req, res) => {
    const notes = readNotes();
    const note = notes.find(n => n.id === parseInt(req.params.id));
    if (note) {
        note.title = req.body.title;
        note.content = req.body.content;
        writeNotes(notes);
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

app.delete('/notes/:id', (req, res) => {
    const notes = readNotes();
    const updatedNotes = notes.filter(n => n.id !== parseInt(req.params.id));
    if (notes.length !== updatedNotes.length) {
        writeNotes(updatedNotes);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

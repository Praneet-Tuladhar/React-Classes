const express = require('express');
const { readTasks, writeTasks } = require('./utils/taskUtils');
const validateTask = require('./middleware/validateTask');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Task API');
});

app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.post('/tasks', validateTask, (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', validateTask, (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id == id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks[index] = { id: Number(id), name, status };
    writeTasks(tasks);
    res.json(tasks[index]);
});

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const tasks = readTasks();
    const task = tasks.find(task => task.id == id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = status;
    writeTasks(tasks);
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    tasks = tasks.filter(task => task.id != id);
    writeTasks(tasks);
    res.status(204).send();
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const fs = require('fs');
const path = './data/tasks.json';

const readTasks = () => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
};

module.exports = { readTasks, writeTasks };

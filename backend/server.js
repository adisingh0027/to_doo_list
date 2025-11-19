const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [
  {
    id: nanoid(),
    title: 'Finishing Wireframe',
    description: 'Complete the initial wireframe',
    datetime: new Date().toISOString(),
    priority: 'Medium',
    status: 'open' // open | in-progress | completed
  }
];

// Helper: search
function matches(task, q) {
  if (!q) return true;
  q = q.toLowerCase();
  return (
    (task.title && task.title.toLowerCase().includes(q)) ||
    (task.description && task.description.toLowerCase().includes(q))
  );
}

app.get('/tasks', (req, res) => {
  const { q } = req.query;
  const result = tasks.filter(t => matches(t, q));
  res.json(result);
});

app.get('/tasks/:id', (req, res) => {
  const t = tasks.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
});

app.post('/tasks', (req, res) => {
  const { title, description, datetime, priority } = req.body;
  if (!title || !datetime) return res.status(400).json({ message: 'title and datetime required' });
  const newTask = {
    id: nanoid(),
    title,
    description: description || '',
    datetime,
    priority: priority || 'Low',
    status: 'open'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const updated = { ...tasks[idx], ...req.body };
  tasks[idx] = updated;
  res.json(updated);
});

app.delete('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Todo API listening on ${port}`));

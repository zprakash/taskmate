const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const db = require('../models');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    const task = await db.Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.id
    });
    
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await db.Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate, status } = req.body;
    
    const task = await db.Task.findOne({
      where: { id, userId: req.user.id }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = await task.update({
      title,
      description,
      priority,
      dueDate,
      status
    });
    
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await db.Task.findOne({
      where: { id, userId: req.user.id }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

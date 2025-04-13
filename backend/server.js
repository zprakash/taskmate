
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

app.get('/', (req, res) => {
  res.send('Task Manager API');
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

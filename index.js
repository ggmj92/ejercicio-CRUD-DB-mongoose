const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const router = require('./routes');

app.use(express.json());

app.use('/api/tasks', routes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
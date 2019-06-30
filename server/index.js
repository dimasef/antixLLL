const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const post = require('./routes/api/task');
app.use('/api/tasks', post);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server run on ${port} port`));
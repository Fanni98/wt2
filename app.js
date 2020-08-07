const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const users = require('./routes/api/users');
const todos = require('./routes/api/todos');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello123 world!'));

app.get('/login', (req, res) => {
    return res.send('animal route testing!');
    console.log(res)
    /*Animal.create(req.body)
      .then(animal => res.json({ msg: 'Animal added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this animal' }));*/
});
  
// use Routes
app.use('/api/users', users);
app.use('/api/todos', todos);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
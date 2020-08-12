const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');


router.get('/test', (req, res) => res.send('todo route testing!'));


router.get('/', (req, res) => {
    Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json({ notodosfound: 'No Todos found' }));
});

router.get('/user/:userId', (req, res) => {
    Todo.find({userId: req.params.userId})
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json({ notodosfound: 'No Todos found' }));
});

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({ notodofound: 'No Todo found' }));
});


router.post('/', (req, res) => {
    Todo.create(req.body)
    .then(todo => res.json({ msg: 'Todo added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this todo' }));
});


router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(todo => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body)
    .then(todo => res.json({ mgs: 'Todo entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a todo' }));
});

module.exports = router;
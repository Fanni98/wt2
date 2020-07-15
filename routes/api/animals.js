const express = require('express');
const router = express.Router();

const Animal = require('../../models/Animal');


router.get('/test', (req, res) => res.send('animal route testing!'));


router.get('/', (req, res) => {
  Animal.find()
    .then(animals => res.json(animals))
    .catch(err => res.status(404).json({ noanimalsfound: 'No Animals found' }));
});


router.get('/:id', (req, res) => {
  Animal.findById(req.params.id)
    .then(animal => res.json(animal))
    .catch(err => res.status(404).json({ noanimalfound: 'No Animal found' }));
});


router.post('/', (req, res) => {
  Animal.create(req.body)
    .then(animal => res.json({ msg: 'Animal added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this animal' }));
});


router.put('/:id', (req, res) => {
  Animal.findByIdAndUpdate(req.params.id, req.body)
    .then(animal => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.delete('/:id', (req, res) => {
  Animal.findByIdAndRemove(req.params.id, req.body)
    .then(animal => res.json({ mgs: 'Animal entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such an animal' }));
});

module.exports = router;
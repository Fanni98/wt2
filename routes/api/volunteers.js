const express = require('express');
const router = express.Router();

const Volunteer = require('../../models/Volunteer');


router.get('/test', (req, res) => res.send('volunteer route testing!'));


router.get('/', (req, res) => {
  Volunteer.find()
    .then(volunteers => res.json(volunteers))
    .catch(err => res.status(404).json({ novolunteersfound: 'No Volunteers found' }));
});


router.get('/:id', (req, res) => {
  Volunteer.findById(req.params.id)
    .then(volunteer => res.json(volunteer))
    .catch(err => res.status(404).json({ novolunteerfound: 'No Volunteer found' }));
});


router.post('/', (req, res) => {
  Volunteer.create(req.body)
    .then(volunteer => res.json({ msg: 'Volunteer added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this volunteer' }));
});


router.put('/:id', (req, res) => {
  Volunteer.findByIdAndUpdate(req.params.id, req.body)
    .then(volunteer => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.delete('/:id', (req, res) => {
  Volunteer.findByIdAndRemove(req.params.id, req.body)
    .then(volunteer => res.json({ mgs: 'Volunteer entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a volunteer' }));
});

module.exports = router;
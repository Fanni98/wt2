const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/db");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require('../../models/User');


router.get('/test', (req, res) => res.send('user route testing!'));

router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ name: req.body.name}).then(user => {
      if (!user) {
        return res.status(400).json({ name: "name dont exists" });
      } else {
            user.token =  Math.random().toString(36).substring(7);
            user.save()
            return res.json(user)
      }
    });
  });

  router.post("/loginadmin", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ name: req.body.name}).then(user => {
      if (!user) {
        return res.status(400).json({ name: "name dont exists" });
      } else {
            user.token =  Math.random().toString(36).substring(7);
            user.save()
            return res.json(user)
      }
    });
  });

router.post("/token", (req, res) => {
  
  User.findOne({ token: req.body.token }).then(user => {
      if (!user) {
        return res.status(400).json({ token: "token dont exists" });
      } else {
            return res.json(user)
      }
    });
  });

router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json([errors]);
    }
  User.findOne({ name: req.body.name }).then(user => {
      if (user) {
        return res.status(400).json({ name: "name already exists" });
      } else {
          const newUser = new User({
          name: req.body.name,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nouserfound: 'users found' }));
});


router.get('/logout',(req,res)=>{
  User.findOne({ name: req.params.name }).then(user => {
    if (!user) {
      return res.status(400).json({ name: "name dont exists" });
    } else {
          localStorage.removeItem('user')
    }
  });
  
})
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
}); 

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});





router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;
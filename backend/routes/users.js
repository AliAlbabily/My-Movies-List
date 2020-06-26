
const router = require('express').Router();
let User = require('../models/user.model');

// ***   Get request   ***/
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

// ***   Post request   ***/
router.route('/add').post((req, res) => {
    const profileObject = req.body.profileObject;
    const tokenObject = req.body.tokenObject;

    const newUser = new User({
        profileObject,
        tokenObject
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
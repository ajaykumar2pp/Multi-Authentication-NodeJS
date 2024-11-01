const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');

// Root Route
// router.get('/', (req, res) => {
//     // res.send('Welcome! Use /register to sign up and /login to log in.');
//     res.redirect('/api/register');
// });

// Register Route
router.get('/register', userController.registerPage);



module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');


// Register GET Route
router.get('/register', userController.registerPage);

// Login GET Route
router.get('/login', userController.loginPage);



module.exports = router;
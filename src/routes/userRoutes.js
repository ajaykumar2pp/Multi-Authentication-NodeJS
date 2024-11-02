const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Register GET Route
router.get('/register', userController.registerPage);

// Login GET Route
router.get('/login', userController.loginPage);

// Register POST Route
router.post('/', userController.postRegister);

// Login POST Route
router.post('/login', userController.postLogin);

// Dashboard GET Route
router.get('/dashboard', userController.dashboardPage);



module.exports = router;
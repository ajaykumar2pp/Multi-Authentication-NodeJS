const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');


// Register Route
router.get('/register', userController.registerPage);



module.exports = router;
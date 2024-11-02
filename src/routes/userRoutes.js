const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.middleware')


// Register GET Route
router.get('/register', userController.registerPage);

// Login GET Route
router.get('/login', userController.loginPage);

// Register POST Route
router.post('/', userController.postRegister);

// Login POST Route
router.post('/login', userController.postLogin);

// Google Authentication
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' 
}));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard'); 
    }
);

// Dashboard GET Route
router.get('/dashboard',auth, userController.dashboardPage);

// Logout GET Route
router.get('/logout', userController.logoutUser);



module.exports = router;
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

// Forget Password GET Route
router.get('/forget-password', userController.forgetPage);

// Forget Password POST Route
router.post('/forget-password', userController.forgetPassword);

// Check Email GET Route
router.get('/check-email', userController.checkEmail);

// Reset Password page
router.get('/reset-password/:token', userController.resetPassword)

// Logout GET Route
router.get('/logout', userController.logoutUser);



module.exports = router;
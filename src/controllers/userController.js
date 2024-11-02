const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const passport = require('passport')


//  Register 
exports.registerPage = (req, res) => {
    res.render('auth/register')
}

// Login 
exports.loginPage = (req, res) => {
    res.render('auth/login')
}

// Dashboard 
exports.dashboardPage = (req, res) => {
    // console.log('Logged-in User:', req.user);
    res.render('pages/dashboard' ,{ user: req.user })
}

// POST Register
exports.postRegister = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        req.flash('error', 'All fields are required')
        req.flash('username', username)
        req.flash('email', email)
        return res.redirect('/')
    }

    try {
        // Check if email exists
        const emailExists = await User.exists({ email: email });
        if (emailExists) {
            req.flash('error', 'Email already taken');
            req.flash('username', username);
            req.flash('email', email);
            return res.redirect('/');
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a user 
        const user = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save the user
        await user.save();

        // Redirect to login Page
        // req.flash('success', 'Registration successful! ');
        return res.redirect('/login');

    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong, please try again.');
        return res.redirect('/');
    }

}

// POST Login
exports.postLogin = (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        req.flash('error', 'All fields are required')
        req.flash('email', email)
        return res.redirect('/login')
    }

    passport.authenticate('local', (err, user, info) => {

        if (err) {
            req.flash('error', 'Something went wrong. Please try again.');
            return res.redirect('/login');
        }

        if (!user) {
            req.flash('error', info.message || 'Invalid login credentials');
            return res.redirect('/login');
        }

        // Login user and redirect to dashboard
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error', 'Login failed. Please try again.');
                return res.redirect('/login');
            }

            req.flash('success', 'Logged in successfully');
            return res.redirect('/dashboard');
        })


    })(req, res, next)
}

// Get Logout 
exports.logoutUser=(req,res)=>{
    req.logout(err => {
        if (err) { return next(err); }
        // req.flash('success', 'You have logged out successfully');
        req.session.destroy(() => {
            res.redirect('/'); 
        });
    });
}
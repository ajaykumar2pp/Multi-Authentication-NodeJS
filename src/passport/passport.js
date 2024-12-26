const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require('../models/user.model')
const bcrypt = require('bcrypt');

// Local Strategy for email and password login
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        // console.log("Checking user with email:", email);

        // check if email exists
        const user = await User.findOne({ email });
        // console.log("User found:", user);

        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // If everything is fine, return the user
        return done(null, user, { message: 'Logged in succesfully' });
    } catch (err) {
        return done(null, false, { message: 'Something went wrong' })
    }
}));


// Google Strategy for OAuth authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,

},
    async (accessToken, refreshToken, profile, done) => {
        // console.log("Google Profile:", profile);
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : 'No email',
                    image: profile.photos ? profile.photos[0].value : 'No image',
                }).save();
            }
            return done(null, user);
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }));


// Github Strategy for OAuth authentication
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log("Github Profile:", profile);
            try {
                // Check if the user already exists in the database based on GitHub ID
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    // If user doesn't exist, create a new user
                    user = new User({
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails ? profile.emails[0].value : 'No email',
                        image: profile.photos ? profile.photos[0].value : 'No image',
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);



// Serialize  user
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});


module.exports = passport;
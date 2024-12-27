require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./src/passport/passport');
const dbConfig = require('./src/config/db.config')
const userRoutes = require('./src/routes/userRoutes');

// Initialize Express app
const app = express();


//***************** Session config   ******************//
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))



//***************** Passport setup  ******************//
app.use(passport.initialize());
app.use(passport.session());

//***************** Express Flash  ******************//
app.use(flash())

//*********** Enable CORS for all routes **************// 
app.use(cors());

// ********  serve the static file from the 'public' directory *********//
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())   // Parse JSON bodies for incoming requests
app.use(express.urlencoded({ extended: false }));   // Parse URL-encoded bodies


// *********   Set Template Engine  *********//

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))

// *********  Database Connection ************//
dbConfig.connectMongoDB();




app.get('/', (req, res) => {
    res.redirect('/register');
});

// ********  Route Setup ***********//
app.use('/', userRoutes);

//*****   404 Error Handling   *******/ 
app.use((req, res, next) => {
    res.status(404).render('errors/error', { title: 'Page Not Found' });
});


// ***********   Port Start   *************//
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error('❌ Failed to start server:', err.message);
    }
    else {
        console.log(`🚀 Server running  on http://localhost:${PORT}`);
    }
})


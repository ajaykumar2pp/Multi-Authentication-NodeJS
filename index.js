require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors')
const dbConfig = require('./src/config/db.config')
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

// ********  serve the static file from the 'public' directory *********//
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// *********   Set Template Engine  *********//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))

// *********  Database Connection ************//
dbConfig.connectMongoDB();


//*********** Enable CORS for all routes **************// 
app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/api/register');
});

// ********  Route Setup ***********//
app.use('/api', userRoutes);


// ***********   Port Start   *************//
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
    console.error('Failed to start the server:', err.message);
});
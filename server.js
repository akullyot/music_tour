// DEPENDENCIES
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();

// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
});

//CONTROLLERS
const bandsController = require('./controllers/bands');
app.use('/bands', bandsController);

const eventsController = require('./controllers/events');
app.use('/events', eventsController);

const stagesController = require('./controllers/stages');
app.use('/events', stagesController);
// SEQUELIZE CONNECTION
// const sequelize = new Sequelize(process.env.PG_URI)

// try {
//     sequelize.authenticate() 
//     console.log(`Connected with Sequelize at ${process.env.PG_URI}`) 
// } catch(err) {
//     console.log(`Unable to connect to PG: ${err}`) 
// };

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
});
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const passport = require('passport')

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize())

const routes = require('./routes');

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
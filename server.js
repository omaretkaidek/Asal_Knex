const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./modules/User/Routes/user.api.routes'); // Assuming routes are in a 'routes' directory

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the user routes
app.use('/api', userRoutes);

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes, if needed

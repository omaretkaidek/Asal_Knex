// user.api.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const { createUservalidation, updateUservalidation, idValidation } = require('../Validation/userValidation');

// Map the HTTP verbs to controller methods

// POST request to create a new user
router.post('/users', createUservalidation, userController.createUser);

// GET request to retrieve a user by ID
router.get('/users/:id', idValidation, userController.getUserById);

// PUT request to update a user by ID
router.put('/users/:id', idValidation, updateUservalidation, userController.updateUserById);

// DELETE request to delete a user by ID
router.delete('/users/:id', idValidation, userController.deleteUserById);

module.exports = router;

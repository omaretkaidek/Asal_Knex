// userValidation.js

const { body, param } = require('express-validator');
const UserModel = require('../model/userModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using UserModel's idExists method
        const exists = await UserModel.idExists(value);
        if (!exists) {
            // If a user with the provided ID is found, throw an error
            throw new Error('ID does not exist in the database');
        }

        // Indicate a successful validation
        return true;
    });

    const name = body('name')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('Name is required')
    .isString().withMessage('Name must contain only letters')
    .isLength({ min: 3, max: 30 }).withMessage('Invalid name length')
    .custom(async (value, { req }) => {
        // Check if the name already exists in the database using UserModel's nameExists method
        const exists = await UserModel.nameExists(value);
        if (exists) {
            // If a user with the provided name is found, throw an error
            throw new Error('Name already exists');
        }

        // Indicate a successful validation
        return true;
    });

const phone = body('phone')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('Phone number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 numbers long');

const country = body('country')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('Country is required')
    .isAlpha().withMessage('Invalid Country address');

const createUservalidation = [
    name,
    phone,
    country
]

const updateUservalidation = [
    name,
    phone,
    country
]

const idValidation = [
    id
]

module.exports = {
    createUservalidation,
    updateUservalidation,
    idValidation
};
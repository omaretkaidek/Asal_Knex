// userService.js

const UserModel = require('../model/userModel');

// If you have an email service or other services, you'd also import them here
// const EmailService = require('./emailService');

const UserService = {
    // Register a user
    async registerUser(userData) {
        // Save the user data to the database
        const newUser = await UserModel.createUser(userData);

        return newUser;
    },

    // Retrieve a user by ID
    async getUserById(userId) {
        return await UserModel.getUserById(userId);
    },

    // Update a user by ID
    async updateUserById(userId, updatedData) {
        return await UserModel.updateUserById(userId, updatedData);
    },

    // Delete a user by ID
    async deleteUserById(userId) {
        return await UserModel.deleteUserById(userId);
    },

    // Other business operations related to users can be added here, such as:
    // - Authenticating a user
    // - Resetting a user password
    // - Updating user profile data
    // ...

};

module.exports = UserService;

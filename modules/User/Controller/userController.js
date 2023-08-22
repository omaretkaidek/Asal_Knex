// userController.js

const UserService = require('../Service/userService');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newUser = await UserService.registerUser(req.body);
        console.log("User created successfully");

        // Send back the appropriate response
        return res.status(201).json(newUser);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        console.log("Error:", error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Sample method for getting a user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update user by ID
exports.updateUserById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await UserService.updateUserById(userId, updatedData);

        if (!updatedUser || updatedUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// Delete user by ID
exports.deleteUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const result = await UserService.deleteUserById(userId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
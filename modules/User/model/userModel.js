// userModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'users';

const UserModel = {
    // Create a new user
    async createUser(userData) {
        return await knex(tableName).insert(userData).returning('*');
    },

    // Read a user by ID
    async getUserById(id) {
        return await knex(tableName).where({ id }).first();
    },

    // Update a user by ID
    async updateUserById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    // Delete a user by ID
    async deleteUserById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idExists(id) {
        const user = await knex(tableName).where({ id }).first();
        return Boolean(user); // returns true if the user exists, otherwise false
    },

    async nameExists(name) {
        const user = await knex(tableName).where({ name }).first();
        return Boolean(user); // returns true if the user with the given name exists, otherwise false
    }
};

module.exports = UserModel;
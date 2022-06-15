export {}
const client = require('../client');
const bcrypt = require('bcrypt');

const createUser = async ({username, password, isAdmin}) => {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const { rows: [users] } = await client.query(`
        INSERT INTO users (username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING username, id, "isAdmin";
        `, [username, hashedPassword])

        return users;
    } catch(error) {
        throw error
    }
}






module.exports = {
    createUser
}
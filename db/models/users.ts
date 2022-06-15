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

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(`
        SELECT *
        FROM users
        `)
        
        console.log('USER ===>', users)
        let password = users.password;
        if(password) {
            password = null
        }
        console.log('these are our users', users)

        return users
    } catch(error) {
        throw error
    }
}






module.exports = {
    createUser,
    getAllUsers
}
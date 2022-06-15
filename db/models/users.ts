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

const getUserByUsername = async (username) => {
    try {
        console.log('username', username)
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        where username = $1;
        `, [username])

        console.log(user)
        return user
    } catch(error) {
        throw error
    }
}



const getUser = async ( username, password) => {
    console.log('username', username)
    console.log('password ===>', password)

    try {
        const user = await getUserByUsername(username);
    }


}






module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername
}
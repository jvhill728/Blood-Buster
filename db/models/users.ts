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
        const user = await getUserByUsername(username)
        console.log('this is the user function', user)
        const hashedPassword = user.password;

        const verifyPassword = await bcrypt.compare(password, hashedPassword)
        console.log('PW', password)
        console.log('HPW', hashedPassword)
        console.log('VPW', verifyPassword)

        if (verifyPassword) {
            user.password = null
            console.log('User after deleted password', user)

            return user
        }
    } catch(error) {
        throw error
    }
}

const getUserById = async (id) => {
    const { rows: [user]} = await client.query(`
    SELECT * FROM users
    where id = $1
    `, [id]);

    return user
}






module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUser,
    getUserById
}
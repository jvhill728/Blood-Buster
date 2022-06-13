const client = require('./client');

async function dropTables() {
    console.log('Dropping All Tables...');

    try {
        await client.query(`
        DROP TABLE IF EXISTS movies;
        DROP TABLE IF EXISTS users;
        `);

        console.log('Finshed dropping those tables!');
    } catch (error) {
        console.log('Error dropping tables!');
        throw error;
    }
}

async function createTables() {
    console.log('Building those tables...');

    try {
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            ); 
            CREATE TABLE movies (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) UNIQUE NOT NULL,
                
            )
            `);
    }
}
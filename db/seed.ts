const client = require('./client');

async function dropTables() {
    console.log('Dropping All Tables...');

    try {
        await client.query(`
        DROP TABLE IF EXISTS movie_tags;
        DROP TABLE IF EXISTS tags;
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
                "releaseDate" INTEGER,
                genre VARCHAR(255) NOT NULL
            );
            CREATE TABLE tags (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
            CREATE TABLE movie_tags (
                "movieId" INTEGER REFERENCES movies(id),
                "tagId" INTEGER REFERENCES tags(id),
                UNIQUE ("movieId", "tagId")
            );
        `);

        console.log('Finished building the tables!');
    } catch (error) {
        console.log('Error building tables!');
        throw error;
    }
}
export{}
const client = require('../client');

const createMovie = async ({
    title,
    releaseDate,
    genre
}) => {
    try {
        const { rows: [movie] } = await client.query(`
        INSTERT INTO movies (title, "releaseDate", genre)
        VALUES($1, $2, $3)
        RETURNING *;
        `, [title, releaseDate, genre])

        return movie
    } catch(error) {
        throw error
    }
}

const getAllMovies = async () => {
    try {
        const { rows: movies } = await client.query(`
        SELECT * 
        FROM movies
        `)

        console.log('there are our spooooky movies!', movies)

        return movies
    } catch(error) {
        throw error
    }
}    

async function getMovieById(id) {
    try {
        const { rows: [movie] } = await client.query (`
        SELECT * FROM movies WHERE id = ($1)
        `, [id])

        return movie;
    } catch(error) {
        throw error
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById
}
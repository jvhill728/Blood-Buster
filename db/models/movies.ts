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


module.exports = {
    createMovie
}
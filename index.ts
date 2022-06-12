export {}

require('dotenv').config();
const express = require('express');
const server = express();

const PORT = process.env.PORT || 4000;

const cors = require('cors');
server.use(cors());

const morgan = require('morgan');
server.use(express.json());

const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

server.use('/api', require('./api'))

const  client  = require('./db');

const handle = server.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}!`);

    try {
        await client.connect();
        console.log('Database is up and running!');
    } catch (error) {
        throw error
    }
});

module.exports = { server, handle };

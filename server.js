const express = require('express');

 const apiRouter = require('./api/api-router.js');
// const configureMiddleware = require('./configure-middleware.js');

const server = express();

// configureMiddleware(server);
server.use(express.json());
server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.json({message: "server running"})
})

module.exports = server;
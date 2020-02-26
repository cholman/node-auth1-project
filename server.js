const express = require('express');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

const apiRouter = require('./api/api-router.js'); 
const configureMiddleware = require('./configure-middleware.js');
const knex = require('./data/database/dbConfig.js');

const server = express();

// configureMiddleware(server);
server.use(express.json());


const sessionConfig = {
    name: 'monster',
    secret: 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    store: new KnexStore({
        knex,
        tablename: 'sessions',
        craetetable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 15,
    }),
    
}

configureMiddleware(server);
server.use(session(sessionConfig));
server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.json({message: "server running"})
})

module.exports = server;
'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'restfy-pd',
    hostname: 'http://localhost',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3200,
    db: {
        get: mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'restify_pdm',
        })
    }
}
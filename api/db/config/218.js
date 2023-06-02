require('dotenv').config()
module.exports = {
    development: {
        username: process.env.DB_218_USERNAME,
        password: process.env.DB_218_PASSWORD,
        database: process.env.DB_218_DATABASE,
        host: process.env.DB_218_HOST,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
            options: { encrypt: false }
        },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
}
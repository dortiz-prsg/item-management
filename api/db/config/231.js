require('dotenv').config()
module.exports = {
    development: {
        username: process.env.DB_231_USERNAME,
        password: process.env.DB_231_PASSWORD,
        database: process.env.DB_231_DATABASE,
        host: process.env.DB_231_HOST,
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
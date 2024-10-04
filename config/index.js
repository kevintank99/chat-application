const dotenv = require('dotenv')

const env = process.env.NODE_ENV
dotenv.config()

const config = {
    version: process.env.version,
    port:process.env.PORT,
    db: process.env.DB_CONNECTION_STRING
}

module.exports = config
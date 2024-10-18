const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

const config = {
    version: process.env.VERSION,
    port:process.env.PORT,
    db: process.env.DB_CONNECTION_STRING,
    jwt_expiration: process.env.JWT_EXPIRATION,
    jwt_secret: process.env.JWT_SECRET
}

module.exports = config
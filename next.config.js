require('dotenv').config()

module.exports = {
    env: {
        DATABASE_PASS: process.env.DATABASE_PASS,
        BASE_ROUTE: process.env.BASE_ROUTE,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        SIGNATURE: process.env.SIGNATURE
    }
}
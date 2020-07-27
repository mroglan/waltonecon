require('dotenv').config()

module.exports = {
    env: {
        DATABASE_PASS: process.env.DATABASE_PASS,
        BASE_ROUTE: process.env.BASE_ROUTE
    }
}
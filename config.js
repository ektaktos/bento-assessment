const dotenv = require('dotenv').config();
module.exports = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
}
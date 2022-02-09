const dotenv = require("dotenv");
const appPath = require("app-root-path");
dotenv.config({ path: `${appPath}/.env` });
/*
import path from'path';
dotenv.config({
    path: path.join(__dirname, '../../../.env'),
});
*/
//export default process.env.NODE_ENV="development"

module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DEV_HOST,
        port: process.env.DEV_PORT,
        dialect: "postgres",
        // seederStorage: 'sequelize'
    },
    test: {
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DB,
        host: process.env.TEST_HOST,
        dialect: "postgres",
        logging: false,
    },
    production: {
        username: process.env.PROD_USER,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DB,
        host: process.env.PROD_HOST,
        dialect: "postgres",
        logging: false,
    },
};
import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
import appPath from "app-root-path";

//import path from'path';

dotenv.config({ path: `${appPath}/.env` });
/*
dotenv.config({
    path: path.join(__dirname, '../../../.env'),
});
*/
const env = process.env.NODE_ENV as string;
const config = require(__dirname + '/../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
export default sequelize;

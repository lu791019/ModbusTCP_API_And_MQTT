import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config(); // this is important!
// 創建一個 Sequelize 實例
const sequelize = new Sequelize(
    {
    database: process.env.POSTGGRESQL_DATABASE,
    username: process.env.POSTGGRESQL_USERNAME,
    password: process.env.POSTGGRESQL_PASSWORD,
    host: process.env.POSTGGRESQL_HOST,
    port: process.env.POSTGGRESQL_PORT,
    dialect: 'postgres', // 使用的數據庫方言
    // 其他配置選項
});



export default sequelize;


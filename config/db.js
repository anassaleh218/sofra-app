const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

const options = {
    host: "sql8.freemysqlhosting.net", // Updated host to match provided details
    dialect: "mysql", // MySQL dialect
    username: "sql8723879", // Updated username
    password: "qewKZaLIjh", // Added password
    database: "sql8723879", // Updated database name
    port: 3306, // Added port number
    logging: console.log, // Logging option
    dialectModule: mysql2 // Use mysql2 as the dialect module
};

const sequelize = new Sequelize(options);

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: "sql8.freemysqlhosting.net", // Updated host to match provided details
    dialect: "mysql", // MySQL dialect
    username: "sql8723879", // Updated username
    password: "qewKZaLIjh", // Added password
    database: "sql8723879", // Updated database name
    port: 3306, // Added port number
    logging: console.log // Logging option
});

module.exports = sequelize;
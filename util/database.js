const Sequelize = require('sequelize');

const sequelize = new Sequelize ('group-chat-app', 'root', 'Pgoen201gssbr$', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
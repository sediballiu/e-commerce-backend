const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    '4KhCrnJDPq',
    '4KhCrnJDPq',
    '7GXP17CSyY',
    {
        host: 'remotemysql.com',
        dialect: 'mysql'
    }
)

const Product = require('./models/product')(sequelize);
const User = require('./models/user')(sequelize);

module.exports = {
    sequelize,
    models: {
        Product,
        User
    }
};

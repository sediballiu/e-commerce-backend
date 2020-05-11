const { DataTypes } = require('sequelize');
module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.createTable("Users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        });
    },
    down: (QueryInterface) => {
        return QueryInterface.dropTable("Users");
    }
}
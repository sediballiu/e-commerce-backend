'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Sequelize.Model{}
    Product.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        info: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        inCart: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        leftInStock: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, { sequelize } );

    return Product;
};
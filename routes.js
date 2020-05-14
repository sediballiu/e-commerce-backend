const express = require('express');
const router = express.Router();
const { Product, User } = require('./db').models;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');

function asyncHandler(callBack){
    return async (req, res, next) => {
        try{
            await callBack(req, res, next);
        }catch(err){
            next(err);
        }
    }
}

router.get('/products', asyncHandler(async (req, res) => {
    const products = await Product.findAll();
    return res.json(products);
}))

router.get('/products/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if(product === null){
        return res.json({error: {message: "Product does not exist!"}})
    }
    return res.json(product);
}))

router.post('/products', asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)
    return res.json(product);
}))

router.delete('/products/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if(product === null){
        return res.json({error: {message: "Product does not exist!"}})
    }
    product.destroy();
    return res.json({message: "Product successfully deleted!"});
}))

router.put('/products/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if(product === null){
        return res.json({error: {message: "Product does not exist!"}})
    }else{
    const updatedProduct = await product.update(req.body, { where: { id: id } })
    return res.json({message: "Product updated!", product: updatedProduct});
    }
}))

// users routes

router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}))

router.post('/users', asyncHandler(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword
    })

    res.json(user);
}))

router.post('/users/login', asyncHandler(async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    console.log(user.dataValues.password);
    if(user === null){
        res.json({ error: {message: "Cannot find user!"} });
    }
    if(await bcrypt.compare(req.body.password, user.dataValues.password)){
        res.json({message: "Logged in"})
    }else{
        res.send("WRONG PASSWORD!")
    }
}))

module.exports = router;
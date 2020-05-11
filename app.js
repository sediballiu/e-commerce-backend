const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 4000;

const { sequelize } = require('./db');
app.use(express.json());
app.use('/api', routes);


sequelize.sync({ force: true })
.then(async () =>{
    console.log('Sequelize sync....');
})
.catch(error => {
    console.log(error);
});

app.use((req, res, next) => {
    const err = new Error("Not Found!");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(port, () => console.log('e-Commerce API listening on port: ', port));
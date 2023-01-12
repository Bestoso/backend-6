const { Router } = require('express');
const productsRouter = require('./products/products.routes');
const cartsRouter = require('./carts/carts.routes');
const usersRouter = require('./users/users.routes');
const staticRouter = require('./static/static.routes');

const router = Router();

//api routes
router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/users', usersRouter);

//static routes
router.use('/', staticRouter);

module.exports = router;


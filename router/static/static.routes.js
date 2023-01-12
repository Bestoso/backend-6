const { Router } = require('express');
const ProductManager = require('../../helpers/productManager');
const manager = new ProductManager('./db/products.json');

const router = Router();

router.get('/', async (req, res) => {
    const products = await manager.getItems();
    res.render('home', {
        title: 'Home page',
        products: products
    });
})

router.get('/products', async (req, res) => {
    const products = await manager.getItems();
    res.render('realTimeProducts', {
        title: 'Products page',
        products: products
    });
})

router.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'Chat page',
    });
})

module.exports = router;
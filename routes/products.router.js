const express = require('express');
const { httpGetAllProducts, httpCreateProduct, httpUploadImage } = require('../controllers/product.controller');

const productsRouter = express.Router();

productsRouter.get('/', httpGetAllProducts);
productsRouter.post('/', httpCreateProduct);
productsRouter.post('/upload', httpUploadImage);

module.exports = productsRouter;
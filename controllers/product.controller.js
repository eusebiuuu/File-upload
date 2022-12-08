const { StatusCodes } = require('http-status-codes');
const { getAllProducts, addNewProduct, uploadFile } = require('../models/product.model');

async function httpGetAllProducts(req, res) {
    const result = await getAllProducts();
    return res.status(StatusCodes.OK).json(result);
}

async function httpCreateProduct(req, res) {
    const { name, price, image } = req.body;
    const result = await addNewProduct({ name, price, image });
    return res.status(StatusCodes.CREATED).json(result);
}

async function httpUploadImage(req, res) {
    const files = req.files;
    const result = await uploadFile(files);
    res.status(StatusCodes.OK).json(result);
}

module.exports = {
    httpCreateProduct,
    httpGetAllProducts,
    httpUploadImage,
}
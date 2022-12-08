const { BadRequestError } = require("../errors");
const Product = require('./product.mongo');
const fs = require('fs');
const cloudinary = require('cloudinary').v2

function isValidProduct(product) {
    const curProduct = new Product(product);
    const productErrors = curProduct.validateSync();
    if (!productErrors) {
        return null;
    }
    let errorMessage;
    Object.values(productErrors.errors).map((err) => {
        errorMessage = err.message;
    });
    console.log(errorMessage);
    throw new BadRequestError(errorMessage);
}

async function addNewProduct(product) {
    isValidProduct(product);
    return Product.create(product);
}

async function getAllProducts() {
    return Product.find({});
}

async function uploadFile(files) {
    if (!files) {
        throw new BadRequestError('No file provided');
    }
    const productImage = files.image;
    if (!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Invalid format provided');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new BadRequestError('Image size exceeds the limit');
    }
    const result = await cloudinary.uploader.upload(files.image.tempFilePath, {
        use_filename: true,
        folder: 'products',
    });
    fs.unlinkSync(files.image.tempFilePath);
    return {
        image: {
            src: `${result.secure_url}`,
        }
    }
}

module.exports = {
    addNewProduct,
    getAllProducts,
    uploadFile,
}
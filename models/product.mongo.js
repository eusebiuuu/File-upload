const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the product name'],
    },
    price: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true, 'Please provide the image'],
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
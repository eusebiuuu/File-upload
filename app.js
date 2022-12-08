require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const productsRouter = require('./routes/products.router');

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
}));
app.use('/api/products', productsRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
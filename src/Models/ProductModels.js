const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productTitle: {
        type: String,
        required: true,
    }
    ,
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productOldPrice: {
        type: Number,
        required: true
    },
    productColor: {
        type: String,
        required: true,
    }

})

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
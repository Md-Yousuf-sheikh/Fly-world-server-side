const ProductModel = require('../Models/ProductModels');


//  add a new product
exports.addProduct = async (req, res) => {
    // create product 
    ProductModel.create(req.body, (err, data) => {
        if (err) {
            res.status(400).json({
                error: true,
                message: err,
            });
        } else {
            res.status(200).json({
                error: false,
                message: data,
            });
        };
    });
};

// get a new product

exports.getProduct = async (req, res) => {
    ProductModel.find({}, (err, data) => {
        if (err) {
            res.status(400).json({
                error: true,
                message: err,
            });
        } else {
            res.status(200).json({
                error: false,
                data: data,
                message: "data fetch successfully",
            });
        };
    });
};

// delete single product

exports.deleteProduct = async (req, res) => {
    ProductModel.deleteOne({ _id: req.body._id }, (err, data) => {
        if (err) {
            res.status(400).json({
                error: true,
                message: err,
            });
        } else {
            res.status(200).json({
                error: false,
                data: data,
                message: "Delete successfully",
            });
        };
    });
};
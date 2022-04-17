const express = require("express");
const { addProduct, getProduct, deleteProduct } = require('../Controllers/ProductControllers');

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getProduct", getProduct);
router.delete("/deleteProduct", deleteProduct);



module.exports = router;
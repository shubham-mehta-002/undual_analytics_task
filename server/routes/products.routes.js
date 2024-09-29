const express = require('express')
const router = express.Router()

const {fetchProducts} = require("../controllers/product.controller")

router.use(express.json())

router.get('/',fetchProducts)

module.exports = router
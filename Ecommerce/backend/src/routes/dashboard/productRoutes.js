//const {authMiddleware} = require("../../middlewares/authMiddleware");
const router = require('express').Router()
const productController=require('../../controllers/dashboard/productController')
const {authMiddleware} = require('../../middlewares/authMiddleware')

router.post('/product-add',productController.add_product)
router.get('/products-get',productController.products_get)

//router.post('/category-add',productController.add_category)
//router.get('/category-get',categoryController.get_category)


//router.post('/category-add',authMiddleware,categoryController.add_category)
// router.post('/category-get',authMiddleware,categoryController.get_category)

module.exports=router
const router = require('express').Router()
const productController=require('../../controllers/dashboard/productController')
const {authMiddleware} = require('../../middlewares/authMiddleware')


router.post('/product-add',authMiddleware,productController.add_product)
router.get('/products-get',authMiddleware,productController.products_get)
router.get('/product-get/:productId',authMiddleware,productController.product_get)
//router.post('/product-update',authMiddleware,productController.product_update)





//router.post('/category-add',productController.add_category)
//router.get('/category-get',categoryController.get_category)


//router.post('/category-add',authMiddleware,categoryController.add_category)
// router.post('/category-get',authMiddleware,categoryController.get_category)

module.exports=router
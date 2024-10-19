const router = require('express').Router()
const sellerController=require('../../controllers/dashboard/sellerController')
//const {authMiddleware} = require("../../middlewares/authMiddleware");



router.get('/request-seller-get',sellerController.request_seller_get)

router.get('/get-seller/:sellerId',sellerController.get_seller)


//router.post('/request-seller-get',authMiddleware,sellerController.request_seller_get)



//router.post('/category-add',authMiddleware,categoryController.add_category)
// router.post('/category-get',authMiddleware,categoryController.get_category)

module.exports=router
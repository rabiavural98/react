//const {authMiddleware} = require("../../middlewares/authMiddleware");
const router = require('express').Router()
const categoryController=require('../../controllers/dashboard/categoryController')
const {authMiddleware} = require('../../middlewares/authMiddleware')

router.post('/category-add',authMiddleware,categoryController.add_category)
router.post('/category-get',authMiddleware,categoryController.get_category)

module.exports=router
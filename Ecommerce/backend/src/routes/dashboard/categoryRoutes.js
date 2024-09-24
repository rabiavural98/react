﻿const router = require('express').Router()
const categoryController=require('../../controllers/dashboard/categoryController')
//const {authMiddleware} = require("../../middlewares/authMiddleware");



router.post('/category-add',categoryController.add_category)
router.get('/category-get',categoryController.get_category)


//router.post('/category-add',authMiddleware,categoryController.add_category)
// router.post('/category-get',authMiddleware,categoryController.get_category)

module.exports=router
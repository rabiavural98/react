﻿//const formidable = require("formidable")
const Formidable=require('formidable').IncomingForm;
const {responseReturn} = require("../../utilities/response")
const cloudinary = require('cloudinary').v2
const sellerModel = require('../../models/sellerModel')
const categoryModel = require("../../models/categoryModel");


class sellerController {


    request_seller_get = async (req, res) => {
        //console.log(req.query)
        const {parPage, page, searchValue} = req.query
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)


        try {
            if (searchValue) {

            } else {
                const sellers = await sellerModel.find({status: 'pending'}).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalSeller = await sellerModel.find({status: 'pending'}).countDocuments()
                responseReturn(res, 500, {error: error.message})

            }
        } catch (error) {

        }
    }
    //end method

    get_seller = async (req, res) => {
        const {sellerId} = req.params
        try {
            const seller = await sellerModel.findById(sellerId)
            responseReturn(res, 200, {seller})
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }

    //end method



    seller_status_update = async (req, res) => {
        const {sellerId,status} = req.body
        try {
            await sellerModel.findByIdAndUpdate(sellerId,{status})
            const seller = await sellerModel.findById(sellerId)
            responseReturn(res, 200, {seller,message:'Seller Status Updated Successfully'})
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }

    //end method
    
}
module.exports = new sellerController()

   
    


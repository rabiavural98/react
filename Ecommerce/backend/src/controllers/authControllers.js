﻿const adminModel=require('../models/adminModel')
const sellerModel=require('../models/sellerModel')
const {sellerCustomerModel}=require('../models/chat/sellerCustomerModel')
const {responseReturn} = require("../utilities/response");
const {createToken} = require("../utilities/tokenCreate");
const bcrypt=require('bcrypt')
const {IncomingForm: Formidable} = require("formidable");
const cloudinary = require('cloudinary').v2


class authControllers { 
    
    admin_login = async (req, res) => {
        const {email, password} = req.body
        try {
            console.log('Try Check Credentials')
            const admin = await adminModel.findOne({email}).select('+password')
            //console.log(admin)
            if (admin) {
                const match = await bcrypt.compare(password, admin.password)
                //console.log(match) 
                if (match) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 200, {token, message: "Login Success"})
                } else {
                    responseReturn(res, 404, {error: "Password Wrong"})
                }


            } else {
                responseReturn(res, 404, {error: "Email not Found"})

            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message})

        }
    }
    //End Method


    
    
    seller_login = async (req, res) => {
        const {email, password} = req.body
        try {
            console.log('Try Check Credentials')
            const seller= await sellerModel.findOne({email}).select('+password')
            //console.log(admin)
            if (seller) {
                const match = await bcrypt.compare(password, seller.password)
                //console.log(match) 
                if (match) {
                    const token = await createToken({
                        id: seller.id,
                        role: seller.role
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 200, {token, message: "Login Success"})
                } else {
                    responseReturn(res, 404, {error: "Password Wrong"})
                }


            } else {
                responseReturn(res, 404, {error: "Email not Found"})

            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message})

        }
    }
    //End Method



    
    seller_register = async (req, res) => {
       // console.log(req.body)
        const {email, name, password} = req.body
   try{
            const getUser=await sellerModel.findOne({email})
                if(getUser){
                    responseReturn(res,404,{error: 'Email Already Exist'})
                }else{
                    const seller=await sellerModel.create({
                        name,
                        email,
                        password: await bcrypt.hash(password,10),
                        method: 'menually',
                        shopInfo:{}
                    })
                   // console.log(seller)
                    await sellerCustomerModel.create({
                        myId: seller.id
                    })
                    const token=await createToken({
                        id: seller.id,
                        role: seller.role
                    })
                    res.cookie('accessToken',token,{
                        
                        expires: new Date(Date.now()+7*24*60*60*1000)
                    })
                    responseReturn(res,201,{token,message: 'Register Success'})

                }
            }catch(error) { 
       //console.log(error)
       responseReturn(res, 500, {error: 'Internal Server Error'})
   }
       }
    //End Method
    
    
    getUser = async (req,res)=>{
        const {id,role}=req;
        try {
            if(role==='admin'){
                const user=await adminModel.findById(id)
                responseReturn(res,200,{userInfo:user})
            }else{
                const seller=await sellerModel.findById(id)
                responseReturn(res,200,{userInfo:seller})

            }
        }catch(error){
            responseReturn(res, 500, {error: 'Internal Server Error'})
        }
  } //End getUser Method



    profile_image_upload=async(req,res)=> {
        const{id}=req
        const form = new Formidable({multiples: true})
        form.parse(req,async (err,_,files)=>{
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })
            const {image}=files
            
            try{
                
            }catch(error){
                
            }
            
            
            
        })
        
        
    }
    //End Method
    
    
    
    
    
}
module.exports=new authControllers()


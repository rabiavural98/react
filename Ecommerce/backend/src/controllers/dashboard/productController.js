const Formidable=require('formidable').IncomingForm;
const {responseReturn} = require("../../utilities/response");
const cloudinary = require('cloudinary').v2
const productModel = require('../../models/productModel')
//const categoryModel = require("../../models/categoryModel");

class productController {

    add_product = async (req, res) => {
        const {id} = req;

        // console.log('product ok')
        const form = new Formidable({multiples: true})

        form.parse(req, async (err, field, files) => {
            //  console.log(files[0])
            // console.log(files)
            //   console.log(files.images[0])
            //   console.log(field)
            let {name, category, description, stock, price, discount, shopName, brand} = field;
            const {images} = files;
            name = name.trim()
            const slug = name.split(' ').join('-')


            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })

            try {

                let allImageUrl = [];
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, {folder: 'products'});
                    allImageUrl = [...allImageUrl, result.url]
                }

                await productModel.create({

                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    brand: brand.trim()
                })

                responseReturn(res, 201, {message: 'Product Added Successfully'})

            } catch (error) {

                responseReturn(res, 500, {error: error.message})
            }


        })

    }

    /// end method

    products_get = async (req, res) => {
        const {page, searchValue, parPage} = req.query
        const {id} = req;

        const skipPage = parseInt(parPage) * (parseInt(page) - 1)

        try {

            if (searchValue) {
                const products = await productModel.find({
                    $text: {$search: searchValue},
                    sellerId: id
                }).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalProduct = await productModel.find({
                    $text: {$search: searchValue},
                    sellerId: id
                }).countDocuments()
                responseReturn(res, 200, {products, totalProduct})
            } else {
                const products = await productModel.find({sellerId: id}).skip(skipPage).limit(parPage).sort({createdAt: -1})
                const totalProduct = await productModel.find({sellerId: id}).countDocuments()
                responseReturn(res, 200, {products, totalProduct})
            }

        } catch (error) {
            console.log(error.message)

        }

    }

    //End Method

    product_get = async (req, res) => {
        const {productId} = req.params;
        try {
            const product = await productModel.findById(productId)
            responseReturn(res, 200, {product})

        } catch (error) {
            console.log(error.message)
        }

    }
}
    
    //End Method

        
module.exports = new productController()
    
    
    

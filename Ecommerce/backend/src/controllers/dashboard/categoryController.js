//const formidable = require("formidable")
const Formidable=require('formidable').IncomingForm;
const {responseReturn} = require("../../utilities/response")
const cloudinary = require('cloudinary').v2
const categoryModel = require('../../models/categoryModel')
 

class categoryController {
    add_category = async (req, res) => {
        //console.log('this is working')
        const form = new Formidable({multiples: true})

        form.parse(req, async (err, field, files) => {

            // console.log(field)
            // console.log(files.images[0])
            
        if(err){
            responseReturn(res,404,{error:'something went wrong'})
        }else{
            let {name} = field
            let {image} = files
            name= name.trim()
            const slug=name.split('').join('-')
        
            
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure:true
            }) 

            try{
            const result= await cloudinary.uploader.upload(image.filepath,{folder:'categorys'})
        
                if(result){
                const category= await categoryModel.create({
                    name,
                    slug,
                    image: result.url
                })
                    responseReturn(res,201,{category,message:'Category Added Successfully'})
        
                }else{
                responseReturn(res,404,{error:'Image Upload File'})

            }

            }catch{
                responseReturn(res,500,{error:'Internal Server Error'})

            }
            
        }

    })

}

    //end method
    
get_category = async (req, res) => {
    //  console.log(req.query)
    const {page, searchValue, parPage} = req.query
    //const skipPage=parseInt(parPage)*(parseInt(page)-1)


    try {
        let skipPage = ''
        if (parPage && page) {
            skipPage = parseInt(parPage) * (parseInt(page) - 1)
        }

        if (searchValue && page && parPage) {
            const categorys = await categoryModel.find({
                $text: {$search: searchValue}
            }).skip(skipPage).limit(parPage).sort({createdAt: -1})
            const totalCategory = await categoryModel.find({
                $text: {$search: searchValue}
            }).countDocuments()
            responseReturn(res, 200, {categorys, totalCategory})
        } else if (searchValue === '' && page && parPage) {

            const categorys = await categoryModel.find({}).skip(skipPage).limit(parPage).sort({createdAt: -1})
            const totalCategory = await categoryModel.find({}).countDocuments()
            responseReturn(res, 200, {categorys, totalCategory})
        } else {

            const categorys = await categoryModel.find({}).sort({createdAt: -1})
            const totalCategory = await categoryModel.find({}).countDocuments()
            responseReturn(res, 200, {categorys, totalCategory})

        }

    } catch (error) {
        console.log(error.message)
    }
}  
     //end method


}


module.exports = new categoryController()

   
    


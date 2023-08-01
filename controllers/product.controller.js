const productModel = require('../models/products.model')

exports.getProduct = (req,res,next) =>{
    //get id 
    //get product 
    //render
    let id = req.params.id
    productModel.getProductById(id).then((product)=>{
        res.render('product',{product:product, isUser:req.session.userId})
    })
}
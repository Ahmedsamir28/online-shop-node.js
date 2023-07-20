// midelware
const productsModel = require('../models/products.model')

exports.getHome = (req, res, next) => {
    // get products 
    //render index.ejs
    let category = req.query.category
    let validCategories = ["Others","Electronics","Clothes","Furniture"]
    let productsPromise

    // i can write category !== 'all' instead of validCategories.includes(category) => like this => if (category && category !== 'all')
    if (category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts()
    productsPromise.then(products => {
        res.render('index', {
            products: products
        })
    })

}
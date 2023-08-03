const mongoose=require('mongoose')

const DB_URL = 'mongodb+srv://ahmedsamir14401:ahmed28111996@online-shop.yorhfyu.mongodb.net/'

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String
})

const product = mongoose.model('product',productSchema)

exports.getAllProducts=()=>{
// connect to db
// get products
//disconnect
return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        return product.find({})
    }).then(product=>{
        mongoose.disconnect()
        resolve(product)
    }).catch(err=>reject(err))
})
}

exports.getProductsByCategory=(category)=>{
return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
        return product.find({category:category})
    }).then(product=>{
        mongoose.disconnect()
        resolve(product)
    }).catch(err=>reject(err))
})
}

exports.getProductById=(id)=>{
return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
        return product.findById(id)
    }).then(product=>{
        mongoose.disconnect()
        resolve(product)
    }).catch(err=>reject(err))
})
}
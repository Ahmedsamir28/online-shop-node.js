const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://ahmedsamir14401:ahmed28111996@online-shop.yorhfyu.mongodb.net/'

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const cartItem = mongoose.model('cart', productSchema)

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            let item = new cartItem(data)
            return item.save()
        })
        .then(() => {
            mongoose.disconnect()
            resolve()
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
        
}

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return cartItem.find(
                {userId:userId},
                {},
                {sort:{timestamp:1}}
                )
        })
        .then((items) => {
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editItem = (id,newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return  cartItem.updateOne({_id:id},newData)
        })
        .then((items) => {
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return cartItem.findByIdAndDelete(id)
        })
        .then(() => {
            mongoose.disconnect()
            resolve()
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
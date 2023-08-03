const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin:{
        type:Boolean,
        isAdmin: false
    }
})

const User = mongoose.model('user', userSchema)

const DB_URL = 'mongodb+srv://ahmedsamir14401:ahmed28111996@online-shop.yorhfyu.mongodb.net/'

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hashedPassword) => {
            let user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                isAdmin: isAdmin
                
            })
            return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve(user)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (!user) {
                    mongoose.disconnect()
                    reject('there is no user matches this email')
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect()
                            reject('password is incorrect')
                        } else {
                            mongoose.disconnect()
                            resolve(user._id)
                        }
                    })
                }
            }).catch(() => {
                reject(err)
            })
    })  
}

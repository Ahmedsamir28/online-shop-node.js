const express = require('express')
const path = require('path')

const session=require('express-session')
const sessionStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter  = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')

const app = express()



app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

const STORE=new sessionStore({
    uri:'mongodb+srv://ahmedsamir14401:ahmed28111996@online-shop.yorhfyu.mongodb.net/',
    collection:'sessions'
}) 

app.use(flash())

app.use(session({
    secret:'this is my secret to hash express session .......',
    store:STORE,
    resave: true,
    saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.set('views', 'views') //default

app.use('/',homeRouter)
app.use('/',authRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)


app.listen(3000, (err) => {
    console.log('server listen on port 3000')
})


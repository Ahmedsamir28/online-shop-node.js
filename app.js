const express = require('express')
const path = require('path')

homeRouter = require('./routes/home.route')

const app = express()

// app.use(
//     "/css",
//     express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
// )
// app.use(
//     "/js",
//     express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
// )
// app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

app.set('view engine', 'ejs')
app.set('views', 'views') //default

app.use('/',homeRouter)

// app.get('/', (req, res, next) => {
//     // Data to pass to the template
//     const data = {
//         title: 'Welcome to My App',
//         message: 'Hello, EJS!'
//     };

//     // Render the 'index.ejs' template with the provided data
//     res.render('index', data);
// })

app.listen(3000, (err) => {
    console.log('server listen on port 3000')
})


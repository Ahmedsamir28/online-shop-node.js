const router = require("express").Router()
const bodyParser = require("body-parser")
const {check} = require('express-validator')
const body = bodyParser.urlencoded({extended:true})

const authController = require('../controllers/auth.controller')
const guardAuth=require('./guards/guardAuth') 

router.get('/signup',guardAuth.notAuth,authController.getSignup)
router.post('/signup',body,
check('username').not().isEmpty().withMessage('UserName IS required'),
check('email').not().isEmpty().withMessage('Email IS required').isEmail().withMessage('Invalid Format'),
check('password').not().isEmpty().withMessage('Password IS required')
.isLength({min:6}).withMessage('Password must be at 6 least 6 charachters'),
check('confirmPassword').custom((value,{req})=>{
    if (value===req.body.password) return true
    else throw 'passwords do not equel'
}),
authController.postSignup
)

router.get('/login',guardAuth.notAuth,authController.getLogin)
router.post('/login',body,authController.postLogin)

router.all('/logout',guardAuth.isAuth,authController.logout)
module.exports = router

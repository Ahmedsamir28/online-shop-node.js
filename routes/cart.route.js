const router = require("express").Router()
const bodyParser = require("body-parser")
const body = bodyParser.urlencoded({ extended: true })
const check = require('express-validator').check

const cartController = require('../controllers/cart.controller')
const guardAuth = require('./guards/guardAuth')

router.get('/',guardAuth.isAuth,cartController.getCart)

router.post('/', guardAuth.isAuth, body,
    check('amount')
        .not()
        .isEmpty()
        .withMessage('amount iS required')
        .isInt({ min: 1 })
        .withMessage('amount must be grater then 0'),
    cartController.postCart
)

router.post('/save',guardAuth.isAuth, body,
check('amount')
    .not()
    .isEmpty()
    .withMessage('amount iS required')
    .isInt({ min: 1 })
    .withMessage('amount must be grater then 0'),
cartController.postSave
)

router.post('/delete',guardAuth.isAuth, body,cartController.postDelete)

module.exports = router
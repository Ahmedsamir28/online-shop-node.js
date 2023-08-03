const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        authError: req.flash('error')[0],
        validationErrors: req.flash('validationErrors'),
        isUser:req.session.userId
    })
}

exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect("/login"))
            .catch(err => {
                req.flash('authError', err)
                res.redirect('/signup')
            })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/signup')
    }

}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('error')[0],
        isUser:req.session.userId
    })
}

exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect("/")
        })
        .catch(err => {
            req.flash('error', err)
            res.redirect("/login")
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
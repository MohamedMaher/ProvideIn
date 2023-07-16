//@desc import libraries & controllers
const express = require('express')
const router = express.Router()
const { signupPage, signup, confirmSignupPage } = require('../controllers/users/signupControl')
const { check, validationResult } = require("express-validator");

//Routers
router.route('/').get((req, res) => { res.render('index', { title: 'Home' }) })

router.route('/users/signup')
    .get(signupPage)
    .post([check('user_name', 'Name is required').not().isEmpty(),
    check('user_mail', 'Mail is required').not().isEmpty(),
    check('user_password', 'Password is empty').not().isEmpty(),
    check('user_password', 'Password must be more than 5 digits').isLength({ min: 6 })], signup)

    router.route('/users/confirmsignup').get(confirmSignupPage)

module.exports = router
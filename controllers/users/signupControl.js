//@import libraries
const { check, validationResult } = require("express-validator");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

//@define variables
var randcode = '';
var user_json = {};

//@connect database
const mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'providein'
})

//@desc send mail to user
//@access private
const sendMail = (to, subject, bodyText, bodyHtml, response) => {
    var transport = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: 'mmahersoliman@hotmail.com',
            pass: 'Soliman@gpc.com.eg1'
        }
    });
    var mailoptions = {
        from: 'mmahersoliman@hotmail.com',
        to: to,
        subject: subject,
        text: bodyText,
        html: bodyHtml
    }
    transport.sendMail(mailoptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            response.render('users/confirmsignup',{title:'Confirm Sign Up'})
        }
    })
}

//@desc signup user page
//@route GET users/signup
//@access public
const signupPage = (req, res) => {
    res.render('users/signup', { title: 'Sign Up' })
}

//@desc signup user
//@route POST users/signup
//@access public
const signup = (req, res) => {
    const resultValidations = validationResult(req);
    if (!resultValidations.isEmpty()) {
        const alert = resultValidations.array();
        console.log(alert);
        res.render('users/signup', { title: "Sign Up", alert: alert });
    } else {
        mysqlCon.query(`select * from users where user_mail='${req.body.user_mail}'`, async function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    const alert = [{ msg: 'Mail is already exist...' }]
                    res.render('users/signup', { title: "Sign Up", alert: alert });
                } else {
                    randcode = Math.floor(Math.random() * 10000);
                    user_pass = (await bcrypt.hash(req.body.user_password, 10)).toString();
                    user_json = {
                        user_name: req.body.user_name,
                        user_mail: req.body.user_mail,
                        user_mobile: req.body.user_mobile,
                        user_password: user_pass
                    };
                    sendMail(req.body.user_mail, `Activation Sign Up E-mail`, `Please insert this code to confirm signing up the code is ${randcode}`, `Please insert this code to confirm signing up the code is ${randcode}`, res)
                }
            }
        })
    }
}


//@desc confirm sign up user page
//@route GET users/confirmsignup
//@access public
const confirmSignupPage = (req, res) => {
    res.render('users/confirmsignup', { title: 'Confirm Sign Up' })
}

//@desc confirm signup user
//@route POST users/confirmsignup
//@access public
const confirmSignup = (req, res) => {

}

module.exports = { signupPage, signup, confirmSignupPage }
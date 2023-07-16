
//@desc signin user page
//@route GET users/signin
//@access public
const signinPage = (req, res) => {
    res.render('users/signin', { title: 'Sign In' })
}

//@desc signin user
//@route POST users/signin
//@access public
const signin = (req, res) => {

}

//@desc reset password page
//@route GET users/resetpassword
//@access public
const resetPasswordPage = (req, res) => {
    res.render('users/resetpassword', { title: 'Reset Password' })
}

//@desc reset password
//@route POST users/resetpassword
//@access public
const resetPassword = (req, res) => {

}
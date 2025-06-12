const userModal = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {generateToken} = require('../utils/generateToken')



module.exports.registeredUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModal.findOne({email: email})
    if(user) {
      req.flash('error', 'You already have an account, please login');
      return res.redirect('/');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await userModal.create({
      fullname,
      email,
      password: hash,
    });

    let token = generateToken(createdUser);
    res.cookie("token", token);
    req.flash('success', 'Account created successfully');
    res.redirect('/shop');

  } catch (error) {
    req.flash('error', error.message || 'Something went wrong');
    res.redirect('/');
  }
}

module.exports.loginUser = async (req,res) =>{
    let {email , password} = req.body;
    let user = await userModal.findOne({email: email});
    if(!user) {
      req.flash('error', 'Email or password not valid');
      return res.redirect('/');
    }

    bcrypt.compare(password, user.password, (err,result)=>{
        if(result) {
            let token = generateToken(user);
            res.cookie('token',token);
            req.flash('success', 'Login successful');
            res.redirect('/shop');
        }
        else {
            req.flash('error', 'Email or password not valid');
            res.redirect('/');
        }
    })
}

module.exports.logout = (req,res)=>{
    res.cookie('token','');
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
}
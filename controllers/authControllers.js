const userModal = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {generateToken} = require('../utils/generateToken')



module.exports.registeredUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModal.findOne({email: email})
    if(user) return res.status(401).send('you already have a account, please login');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await userModal.create({
      fullname,
      email,
      password: hash,
    });

    let token = generateToken(createdUser);
    res.cookie("token", token);
    res.render('shop')

  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports.loginUser = async (req,res) =>{
    let {email , password} = req.body;
    let user = await userModal.findOne({email: email});
    if(!user) return res.send("email or password not valid");

    bcrypt.compare(password, user.password , (err,result)=>{
        if(result) {
            let token = generateToken(user);
            res.cookie('token',token);
            res.send('you can login')
        }
        else res.send('something is wrong')
    })
}

module.exports.logout = (req,res)=>{
    res.cookie('token','');
    res.redirect('/');
}
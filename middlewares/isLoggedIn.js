const jwt = require('jsonwebtoken');
const userModal = require('../models/user')

module.exports = async function (req,res,next){
    if(!req.cookies.token) {
        res.flash('you need to login first');
        res.redirect('/')
    }

    try {
            let decoded = jwt.verify(req.cookies.token , process.env.JWT_KEY);
    let user = await userModal.findOne({email : decoded.email}).select('-password');

    req.user = user;

    next();
    } catch (error) {
        res.flash('something went wrong in logged in');
        res.redirect('/')
    }
}
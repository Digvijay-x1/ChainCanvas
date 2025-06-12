const jwt = require('jsonwebtoken');
const userModal = require('../models/user');

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModal.findOne({ email: decoded.email }).select('-password');
        req.user = user;
        next();
    } catch (error) {
        req.flash('error', 'Something went wrong in logged in');
        return res.redirect('/');
    }
}
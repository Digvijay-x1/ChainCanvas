const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product')

router.get('/', function(req,res){
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index',{error, success});

})

router.get('/shop',isLoggedIn ,async (req,res)=>{
    const products = await productModel.find();
    let success = req.flash('success');
    res.render('shop',{products, success});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product')
const userModal = require('../models/user')

router.get('/', function(req,res){
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('index',{error, success , LoggedIn: false});

})

router.get('/shop',isLoggedIn ,async (req,res)=>{
    const products = await productModel.find();
    let success = req.flash('success');
    res.render('shop',{products, success});
});



router.get('/addtocart/:id' , isLoggedIn , async(req,res)=>{
    let user = await userModal.findOne({email: req.user.email})
    user.cart.push(req.params.id)
    await user.save();
    req.flash('success' , 'added to cart')
    res.redirect('/shop')
})


router.get('/cart',isLoggedIn ,async (req,res)=>{
    let user = await userModal.findOne({email: req.user.email}).populate('cart')
    res.render('cart', {user});
});
module.exports = router;

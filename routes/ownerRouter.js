const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner')



if(process.env.NODE_ENV === 'development'){
    router.post('/create', async (req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            req.flash('error', 'Not allowed to create another user');
            return res.redirect('/owners/admin');
        }

        let {fullname , email , password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })

        req.flash('success', 'Owner created successfully');
        res.redirect('/owners/admin');
    })
}

router.get('/admin',(req,res)=>{
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('createproducts', {success, error});
})

module.exports = router;

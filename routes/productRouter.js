const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.send('ok');
});

// Handle product creation
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        
        if (!req.file) {
            req.flash('error', 'Please upload an image');
            return res.redirect('/owners/admin');
        }

        const newProduct = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer
        });

        req.flash('success', 'Product created successfully');
        res.redirect('/owners/admin');
    } catch (error) {
        req.flash('error', error.message || 'Error creating product');
        res.redirect('/owners/admin');
    }
});

module.exports = router;

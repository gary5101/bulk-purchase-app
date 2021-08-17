const express = require('express');
// const bodyParser = require('body-parser');
const productRoutes = express.Router();
let Product =require('../models/product');

productRoutes.get(('/'),function(req,res){
    Product.find(function(err,products){
        if(err) {
            console.log(err);
        }
        else {
            res.json(products);
        }
    });
});

productRoutes.post(('/'),function(req,res){
    let product =new Product(req.body)
    product.save()
        .then(product => {
            res.status(200).send('successfully added product');
        })
        .catch(err =>{
            // console.log(err)
            res.status(400).send(err);
        });
});

productRoutes.get(('/:id'),function(req,res){
    let id = req.params.id;
    Product.findById(id,function(err,products){
        if(err) {
            console.log(err);
        }
        else {
            res.json(products);
        }
    });
});

productRoutes.put(('/:id'),function(req,res){
    let id = req.params.id;
    console.log(req.body);
    Product.findByIdAndUpdate(id,req.body,function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.status(400).send('Successfully updated product');
        }
    });
});

productRoutes.delete(('/:id'),function(req,res){
    let id = req.params.id;
    Product.findByIdAndDelete(id,function(err,products){
        if(err){
            console.log(err);
        }
        else
        {
            res.status(400).send('Successfully deleted product');
        }
        
    });
});

module.exports = productRoutes;
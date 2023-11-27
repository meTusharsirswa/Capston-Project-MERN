const express = require("express");
const Product = require("../model/Product");

const CreateProduct = async(req,res)=>{
    const {name , description , price ,image} = req.body;
    const products = await Product.create({
        name : name,
        description : description,
        price : price,
        image : image,
    })
    res.status(200).json({
        status : true,
        message : "Product Added Successfully !!!",
        data : products
    })

}

const GetProducts = async(req,res)=>{
    const products = await Product.find({});
    res.status(200).json({
        status : true,
        message : "Product List Fetched !!!",
        data : products
    })
}

const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      res.status(200).json({
        status : true,
        message : "Find By Product Id ",
        data : product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
module.exports = {
    CreateProduct,
    GetProducts,
    getProductById
}
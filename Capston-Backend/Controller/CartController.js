const express = require("express");
const Cart = require("../model/Cart");

const AddCartItem = async (req, res) => {
  try {
    const { product_id, count } = req.body;
    let Cartproduct = await Cart.findOne({ product_id });
    console.log(Cartproduct);
    if (Cartproduct) {
      console.log("product id exist ");
      res.json({
        status: false,
        message: "Product already exist in Cart !!!",
      });
    } else {
      const Cartproduct = await Cart.create({ product_id , count });

      res.status(200).json({
        status: true,
        message: "Product Added in Cart Successfully !!!",
        data: Cartproduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetCartProduct = async (req, res) => {
  try {
    const getCartItem = await Cart.find({}).populate("product_id");
    res.status(200).json({
      status: true,
      message: "Cart Product List fetched !!!",
      data: getCartItem,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error while Get Cart Product !!!",
      error: error.message,
    });
  }
};

const removeCartProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Cart.findByIdAndRemove({ _id: productId });
    res.status(200).json({
      status: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateCartProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartProduct = await Cart.findOneAndUpdate(
      { _id: productId },
      { $set: { quantity } },
      { new: true }
    );
    if (!cartProduct) {
      return res.status(500).json({
        status: false,
        message: "Cart Product not Fount !!!",
      });
    }
    res.status(200).json({
      status: true,
      message: "Cart Product Quantity Updated Successfully !!!",
      data: cartProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({
         message: "Internal Server Error",
          error: error.message
         });
  }
};
module.exports = {
  AddCartItem,
  GetCartProduct,
  removeCartProduct,
  updateCartProduct
};

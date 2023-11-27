const express = require("express");
const OrderedHistory = require("../model/OrderedHistory");

const getOrderdHistoryById = async (req, res) => {
  const orderHistoryById = await OrderedHistory.findById(req.params.id).populate("product_id")
  res.status(200).json({
    status: true,
    message: "Purchased Product fetched By Id !!!",
    data: orderHistoryById,
  });
};

const getOrderHistory = async (req, res) => {
  const orderHistory = await OrderedHistory.find({}).populate("product_id");
  res.status(200).json({
    status: true,
    message: "Order History Fetched !!!",
    data: orderHistory,
  });
};

const PostOrder = async (req, res) => {
  const { product_id } = req.body;
  const order_place_time = new Date()
  const postOrder = await OrderedHistory.create({
    product_id,
    order_place_time,
  });
  res.status(200).json({
    status: true,
    message: "Order Purchased Successfully !!!",
    data: postOrder,
  });
};

module.exports = {
  getOrderdHistoryById,
  PostOrder,
  getOrderHistory,
};

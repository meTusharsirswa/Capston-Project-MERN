const express = require("express")
const router = express.Router();


// User Routes
const {UserDetail , loginData,userData,logout} = require("../Controller/UserController")
router.route("/register").post(UserDetail);
router.route("/login").post(loginData);
router.route('/user').get(userData)
router.route('/user-logout').post(logout)

const Product = require("../Controller/ProductController")
router.post("/add-product", Product.CreateProduct);
router.get("/get-products", Product.GetProducts);
router.get("/get-products/:id", Product.getProductById);


// Cart 
const Cart = require("../Controller/CartController");
router.post("/add-cart-product",Cart.AddCartItem);
router.get("/get-cart-product",Cart.GetCartProduct)
router.post("/remove-cart-product/:id",Cart.removeCartProduct)
router.post("/update-cart-product",Cart.updateCartProduct)

// Order History 
const OrderHistory = require("../Controller/OrderedHistory");
router.get("/get-purchase-order-history/:id",OrderHistory.getOrderdHistoryById)
router.get("/get-order-history",OrderHistory.getOrderHistory)
router.post("/post-purchase-order",OrderHistory.PostOrder)
module.exports = router;

  
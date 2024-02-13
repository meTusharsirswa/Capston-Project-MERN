import React, { useEffect, useState } from "react";
import { formatIndianCurrency } from "../utils";
import axios from "axios";
import "../css/Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import Navbar from "./Section/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [productCounts, setProductCounts] = useState([]);
  const navigate = useNavigate();

  const getCartProduct = () => {
    axios.get("http://localhost:4000/get-cart-product").then((res) => {
      if (res.status === 200 && res.data) {
        setCartProduct(res.data.data);
        setProductCounts(res.data.data.map((item) => item.quantity));
      }
    });
  };
  useEffect(() => {
    getCartProduct();
  }, []);
  const incrementCounter = (index) => {
    const updatedCounts = [...productCounts];
    updatedCounts[index] += 1;
    setProductCounts(updatedCounts);

    const productId = cartProduct[index]._id;
    const newQuantity = updatedCounts[index];

    // Update the local state first
    setProductCounts(updatedCounts);

    // Send an HTTP request to update the quantity in the database
    updateCartProductCount(productId, newQuantity);
  };

  const decrementCounter = (index) => {
    if (productCounts[index] > 0) {
      const updatedCounts = [...productCounts];
      updatedCounts[index] -= 1;
      setProductCounts(updatedCounts);

      const productId = cartProduct[index]._id;
      const newQuantity = updatedCounts[index];

      // Update the local state first
      setProductCounts(updatedCounts);

      // Send an HTTP request to update the quantity in the database
      updateCartProductCount(productId, newQuantity);
    }
  };

  const updateCartProductCount = (productId, quantity) => {
    console.log("Product ID:", productId);

    axios
      .post(`http://localhost:4000/update-cart-product`, {
        productId,
        quantity,
      })
      .then((res) => {
        // Handle the response if needed
        console.log(res.data.data);

        // Call the getCartProduct function to refresh the cart data after the request is successful
        getCartProduct();
      })
      .catch((error) => {
        console.error("Error updating cart product quantity:", error);
      });
  };

  const removeProductFromCart = (productId) => {
    axios
      .post(`http://localhost:4000/remove-cart-product/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCartProduct(
            cartProduct.filter((product) => product._id !== productId)
          );
        }
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const proceedToBuyFromCart = () => {
    axios.post("http://localhost:4000/proceed-to-buy").then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/orderHistory");
        }, 1500);
        setCartProduct([]);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cartProduct.length; i++) {
      total += cartProduct[i].product_id.price * productCounts[i];
    }
    return total;
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container cart_parentContainer">
        {cartProduct.length === 0 ? (
          <div
            className="col-12 d-flex justify-content-center"
            style={{ marginTop: "6rem", marginLeft: "20%" }}
          >
            <img src="../../public/empty-cart.png" alt="" />
          </div>
        ) : (
          <div className="cart_container row">
            <h3 className="mx-3 my-3">Shopping Cart </h3>
            <hr />
            {cartProduct.map((product, index) => (
              <div
                key={index}
                className="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <div className="d-flex card_one_cart">
                  <div></div>
                  <button className="delete_icon">
                    <DeleteIcon
                      className="mx-2"
                      onClick={() => removeProductFromCart(product._id)}
                    />
                  </button>
                  <img
                    className="cart_image"
                    src={product.product_id.image}
                    alt=""
                  />
                  <section
                    className="align-items-center mx-3"
                    style={{ width: "100%" }}
                  >
                    <h6>
                      <CheckCircleOutlineRoundedIcon className="rightSign_icon" />{" "}
                      Added to Cart
                    </h6>
                    <h6 className="product-name">
                      {/* {product.product_id.name.length > 50
                        ? `${product.product_id.name.slice(0, 50)}...`
                        : product.product_id.name} */}
                      {product.product_id.name}
                    </h6>
                    <section className="d-flex column-gap-2">
                      <button
                        className="add_subtract_icon"
                        onClick={() => decrementCounter(index)}
                      >
                        <RemoveIcon />
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        {product.quantity}
                      </div>

                      <button
                        className="add_subtract_icon"
                        onClick={() => incrementCounter(index)}
                      >
                        <AddIcon />
                      </button>
                    </section>
                  </section>
                  <h5>{formatIndianCurrency(product.product_id.price)}</h5>
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}
        {cartProduct.length > 0 && (
          <div className="porduct_detail ">
            <h6>
              Total Product:{" "}
              <strong>
                {" "}
                {productCounts.reduce((a, b) => a + b, 0)} items{" "}
              </strong>
            </h6>
            <h6>
              Total Amount :{" "}
              <strong>{formatIndianCurrency(calculateTotalPrice())} </strong>
            </h6>
            <Button
              variant="outlined"
              onClick={proceedToBuyFromCart}
              className="my-1"
            >
              Proceed To Buy
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

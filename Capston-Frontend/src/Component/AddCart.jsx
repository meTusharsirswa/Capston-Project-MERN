import React, { useEffect, useState } from "react";
import { formatIndianCurrency } from "../utils";
import axios from "axios";
import "../css/Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
const AddCart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [productCounts, setProductCounts] = useState([]);
  const [value, setValue] = React.useState(0);

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
    axios.post("http://localhost:4000/delete-all-cart-product").then((res) => {
      if (res.status === 200) {
        // Clear the cartProduct state in your frontend
        setCartProduct([]);
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
      <div className="container">
        {cartProduct.length === 0 ? (
          <div className="col-12 text-center">
            <p>Cart is empty</p>
          </div>
        ) : (
          <div className="cart_container row">
            {cartProduct.map((product, index) => (
              <div key={index} className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                <div className="d-flex card_one_cart">
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
                      <CheckCircleOutlineRoundedIcon /> Added to Cart
                    </h6>
                    <h6 className="product-name">
                      {product.product_id.name.length > 50
                        ? `${product.product_id.name.slice(0, 50)}...`
                        : product.product_id.name}
                    </h6>
                    <h5>{formatIndianCurrency(product.product_id.price)}</h5>
                  </section>
                  <section>
                    <button
                      className="add_subtract_icon"
                      onClick={() => incrementCounter(index)}
                    >
                      <AddIcon />
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      {product.quantity}
                    </div>
                    <button
                      className="add_subtract_icon"
                      onClick={() => decrementCounter(index)}
                    >
                      <RemoveIcon />
                    </button>
                  </section>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartProduct.length > 0 && (
        <div className="porduct_detail">
          <h6>
            <strong>
              Subtotal: ({productCounts.reduce((a, b) => a + b, 0)} items){' '}
              {formatIndianCurrency(calculateTotalPrice())}
            </strong>
          </h6>
          <Button variant="outlined" onClick={proceedToBuyFromCart}>
            Proceed To Buy
          </Button>
        </div>
      )}
    </>
  );
};

export default AddCart;

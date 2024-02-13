import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatIndianCurrency } from "../utils";
import "../css/ProductById.css";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Section/Navbar";
const ProductById = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/get-products/${productId}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && response.data) {
          setProduct(response.data.data);
        } else {
          console.error("Invalid response from the server:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    if (product) {
      const product_id = product._id;
      axios
        .post(`http://localhost:4000/add-cart-product`, { product_id })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            toast.success(response.data.message, {
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
              navigate("/Cart");
            }, 1500);
          } else if (response.data.status === false) {
            toast.success(response.data.message, {
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
              navigate("/Cart");
            }, 1500);
          }
        })
        .catch((error) => {
          console.error("Error adding product to the cart:", error);
          toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  const purchaseProduct = () => {
    if (product) {
      const product_id = product._id;
      axios
        .post(`http://localhost:4000/post-purchase-order`, { product_id })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            toast.success(response.data.message, {
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
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error("Error Purchasing product :", error);
        });
    }
  };

  if (!product) {
    return (
      <div className="loding">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="productscreen">
        <ToastContainer />
        <div className="container">
          <div className="productscreen__left row">
            <div className="left__image col-sm-12 col-md-12 col-lg-4 col-12">
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                }}
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="left__info col-sm-12 col-md-12 col-lg-4 col-12">
              <p className="left__name">{product.name}</p>
              <p className="left_price">
                Price: <span>{formatIndianCurrency(product.price)}</span>
              </p>
              <p className="left_description">
                Description: {product.description}
              </p>
            </div>
          </div>
          <div className="productscreen__right col-sm-8 col-md-6 col-lg-4 col-8 container my-4">
            {/* <div className="right__info"> */}
            {/* <p className="left_price">
                  Price:
                  <span>{formatIndianCurrency(product.price)}</span>
                </p> */}
            <p>
              <button
                type="button"
                className="add_to_cart_btn fw-bold fs-6 text-decoration-none"
                onClick={addToCart}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className="buy_now_btn fw-bold fs-6 text-decoration-none"
                onClick={purchaseProduct}
              >
                Buy Now
              </button>
            </p>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductById;

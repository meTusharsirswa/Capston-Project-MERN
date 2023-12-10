import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatIndianCurrency } from "../utils";
import "../css/ProductById.css";

import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
// import CircularProgress from "@mui/joy/CircularProgress";
import LinearProgress from "@mui/joy/LinearProgress";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Warning from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";

const ProductById = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
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

  const buyNow = () => {
    console.log("buyNow");
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (product) {
      const product_id = product._id;
      console.log("Product ID to be added to the cart: ", product_id);
      axios
        .post(`http://localhost:4000/add-cart-product`, { product_id })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            console.log("Success");
            setShowSuccessAlert(true);
            setTimeout(() => {
              setShowSuccessAlert(false);
              navigate("/Cart");
            }, 2000);
          } else if (response.data.status === false) {
            console.log("Product already exists in the cart");

            navigate("/Cart");
          }
        })
        .catch((error) => {
          console.error("Error adding product to the cart:", error);
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
            console.log("Product Purchase Successfully !!!");
            setPurchaseSuccess(true);
            setTimeout(() => {
              setPurchaseSuccess(false);
              navigate("/orderHistory");
            }, 2000);
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
    return <div className="loding"><CircularProgress/></div>;
  }

  return (
    <div className="productscreen">
      <Stack
        spacing={2}
        sx={{ maxWidth: 400 }}
        className={`success-alert ${
          showSuccessAlert || purchaseSuccess ? "show-success-alert" : ""
        }`}
      >
        {showSuccessAlert && (
          <Alert
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check fontSize="xl2" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              ></IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Success</Typography>
              <Typography level="body-sm">
                Product Added to Cart Successfully!!!
              </Typography>
            </div>
            <LinearProgress
              variant="soft"
              value={40}
              sx={(theme) => ({
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: `rgb(${theme.vars.palette.success.lightChannel} / 0.72)`,
                "--LinearProgress-radius": "0px",
              })}
            />
          </Alert>
        )}

        {purchaseSuccess && (
          <Alert
            size="lg"
            color="success"
            variant="solid"
            invertedColors
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                }}
              >
                <div>
                  <Check fontSize="xl2" />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                }}
              ></IconButton>
            }
            sx={{ alignItems: "flex-start", overflow: "hidden" }}
          >
            <div>
              <Typography level="title-lg">Success</Typography>
              <Typography level="body-sm">
                Product Purchased Successfully!
              </Typography>
            </div>
            <LinearProgress
              variant="soft"
              value={40}
              sx={(theme) => ({
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: `rgb(${theme.vars.palette.success.lightChannel} / 0.72)`,
                "--LinearProgress-radius": "0px",
              })}
            />
          </Alert>
        )}

        {showErrorAlert && (
          <Alert
            variant="soft"
            color="danger"
            invertedColors
            startDecorator={
              <CircularProgress size="lg">
                <Warning />
              </CircularProgress>
            }
            sx={{ alignItems: "flex-start", gap: "1rem" }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography level="title-md">Lost connection</Typography>
              <Typography level="body-md">
                Please verify your network connection and try again.
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Button variant="outlined" size="sm">
                  Open network settings
                </Button>
                <Button variant="solid" size="sm">
                  Try again
                </Button>
              </Box>
            </Box>
          </Alert>
        )}
      </Stack>
      <>
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
        
      </>
    </div>
  );
};

export default ProductById;

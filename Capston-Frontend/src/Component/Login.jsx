import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

import Button from "@mui/joy/Button";

import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:4000/login', { email, password });
  //     if (response.data.success) {
  //       // Save token to local storage or session storage
  //       localStorage.setItem('token', response.data.token);
  //       console.log("Login successfully")
  //       // Redirect or do something else after successful login
  //     } else {
  //       console.log('Error:', response.data.message); // Log the error
  //     }
  //   } catch (error) {
  //     // Log the error details
  //     console.error('Error occurred during login:', error);
  //     // Display the error message from the server response, if available
  //     if (error.response && error.response.data && error.response.data.message) {
  //       console.log('Server Error:', error.response.data.message);
  //       console.log("right " , error.response.data.message)
  //     } else {
  //       console.log('An unknown error occurred');
  //     }
  //   }
  // };

  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("token"));
    if (token && !props.loggedIn) {
      // Token found and user is not logged in
      props.setLoggedIn(true); // Set logged-in state
      navigate("/dashboard"); // Redirect to dashboard or protected route
    }
  }, [props.loggedIn]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          console.log("Login successful");
          document.cookie = `token=${response.data.token}; max-age=86400; path=/`; // Store token in cookie for 1 day
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
            props.setLoggedIn(true);
            navigate("/dashboard");
          }, 1500);
        } else {
          console.error("Login failed");
          toast.error(response.data.message || "Unknown error occurred", {
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
      })
      .catch((error) => {
        console.error("An error occurred while logging in:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.log("An unknown error occurred");
        }
      });
  };
  return (
    <>
      <ToastContainer />

      <div className="container">
        <div className="d-flex row ">
          <div className="p-5 m-auto login_container mt-5 ">
            <h2 className="fw-semibold fs-1">Login</h2>
            <p className="fs-6">
              Get access to your Orders, Wishlist, and Recommendations
            </p>
            <form onSubmit={handleSubmit}>
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Enter email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" login_input_field col-sm-12 col-md-12 col-lg-10 col-xl-10 col-6"
                  required
                />
                <br />
                <TextField
                  className="login_input_field mt-3 mb-2 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-6"
                  id="outlined-basic"
                  label="Enter Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>
                  By continuing, you agree to BookStore{" "}
                  <span className="text-primary">Terms of Use </span> and{" "}
                  <span className="text-primary">Privacy Policy.</span>
                </p>
                <Button
                  type="submit"
                  className="Login-btn col-sm-6 col-md-2 col-lg-2 col-xl-2  col-6"
                  endDecorator={<KeyboardArrowRight />}
                >
                  Login
                </Button>
              </div>
            </form>
            <Link to="/register" className="mt-2 d-flex ">
              New to BookStore ? Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

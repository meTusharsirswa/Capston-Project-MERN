import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

import Button from "@mui/joy/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

// ... rest of your component code ...

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", {
        first_name,
        last_name,
        email,
        password,
      });

      if (response.data.success) {
        console.log("User Register successful");
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
          navigate("/dashboard");
        }, 1);
      } else {
        console.error("Registration failed");
        toast.error(
          error.response.data.message ||
            "An error occurred during registration",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the specific error message received from the backend API response
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
        // If no specific error message is received, display a generic error message
        toast.error(
          "An error occurred while registering. Please try again later.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="d-flex ">
        <section className="p-5 m-auto register_container mt-5 ">
          <h2 className="fw-semibold fs-1">Register</h2>
          <p className="fs-6" style={{ width: "85%" }}></p>

          <form onSubmit={handleSubmit} className="register_form">
            <div className="row">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                className=" col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12"
              />

              <TextField
                className="  mb-2 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" register_input_filed  col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12"
                required
              />

              <TextField
                className="register_input_filed  col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* <p>
                By continuing, you agree to Flipkart's{" "}
                <span className="text-primary">Terms of Use </span> and{" "}
                <span className="text-primary">Privacy Policy.</span>
              </p> */}
            <Button
              type="submit"
              className="Login-btn"
              endDecorator={<KeyboardArrowRight />}
            >
              Register
            </Button>
          </form>
          <Link to="/register" className="mt-2 d-flex ">
            You have already account on this website
          </Link>
          <span></span>
        </section>
      </div>
    </>
  );
};

export default Register;

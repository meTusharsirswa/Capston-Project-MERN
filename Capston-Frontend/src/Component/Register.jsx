import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Button from "@mui/joy/Button";

import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";

import axios from "axios";

// ... rest of your component code ...

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", {
        first_name,
        last_name,
        email,
        password,
      });

      if (response.status) {
        console.log("User Register successful");
        setShowSuccessAlert(true);

        // setTimeout(() => {
        // }, 3000);

        setTimeout(() => {
          setShowSuccessAlert(false);

          navigate("/");
        }, 2000);
      } else {
        console.error("Registration  failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{ maxWidth: 400 }}
        className={`success-alert ${
          showSuccessAlert ? "show-success-alert" : ""
        }`}
      >
        {" "}
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
                User Register Successfully !!!
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
      </Stack>
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
              />

              <TextField
                className="register_input_filed  col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>

            {/* <p>
                By continuing, you agree to Flipkart's{" "}
                <span className="text-primary">Terms of Use </span> and{" "}
                <span className="text-primary">Privacy Policy.</span>
              </p> */}
            <Button type="submit" className="Login-btn" endDecorator={<KeyboardArrowRight />}>
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

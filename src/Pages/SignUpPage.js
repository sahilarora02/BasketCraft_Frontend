import { TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignUpPage() {
  const [registerMsg, setRegisterMsg] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const registerMsgHandler = () => {
    setRegisterMsg(true);
  };

  const addressHandler = (event)=>{
    setAddress(event.target.value);
  }

  const otpChangeHandler = (event) => {
    setOtp(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const twoFunctions = (event) => {
    handleOpen();
    EmailSendHandler(event);
  };

  const EmailSendHandler = async (event) => {
    event.preventDefault();
    const body = {
      Email: email,
      Phone: phone,
    };
    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const resp = await fetch(
        "http://localhost:3002/sendMail",
        requestOptions
      );
      if (resp.status === 200) {
        Store.addNotification({
          title: "Yayy!",
          message: "Send Mail Succesfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });
       
      }
    } catch (err) {
      console.log("Err ", err);
      Store.addNotification({
        title: "Oops!",
        message: "Error Occured",
        type: "danger",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
    }
  };

  const RegisterHandler = async (event) => {
    event.preventDefault();
    const body = {
      Email: email,
      Password: password,
      Name: name,
      otp: otp,
      Phone: phone,
    };
    console.log(body);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      console.log("hiiii");
      const resp = await fetch(
        "http://localhost:3002/Register",
        requestOptions
      );
      if (resp.status === 300) {
        Store.addNotification({
          title: "Oops!",
          message: "Already Registered",
          type: "warning",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });
      }
      if (resp.status === 401) {
        Store.addNotification({
          title: "Oops!",
          message: "Invalid Otp",
          type: "warning",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });
      }
      if (resp.status === 200) {
        Store.addNotification({
          title: "Yayyy!",
          message: "Succesfully Registered",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });
        registerMsgHandler();
        setTimeout(() => {
          navigate("/", {});
        }, 5000);
      }
    } catch (err) {
      console.log("Err ", err);
      Store.addNotification({
        title: "Oops!",
        message: "Error Occured",
        type: "danger",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
    }
  };

  return (
    <div>
      {!registerMsg && (
        <div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              paddingLeft: "20px",
            }}
          >
            Create your profile
          </p>
          <div style={{ display: "flex", paddingLeft: "20px" ,fontSize:"20px"}}>
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <a style={{ color: "blue" }}> Login</a>
            </Link>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", paddingLeft: "50px" }}>
              <img
                src="SignUp.jpg"
                alt=""
                style={{ height: "400px", width: "400px" }}
              />
            </div>
            <div
              style={{ width: "50%", paddingLeft: "50px", paddingTop: "50px" }}
            >
              <TextField
                placeholder="Enter Your Full Name"
                style={{ width: "250px" }}
                onChange={nameChangeHandler}
              />{" "}
              <br></br>
              <TextField
                placeholder=" Your Email "
                style={{ width: "250px", marginTop: "20px" }}
                onChange={emailChangeHandler}
              />
              <br></br>
              <TextField
                placeholder="Your Contact Number"
                style={{ width: "250px", marginTop: "20px" }}
                onChange={phoneChangeHandler}
              />{" "}
              <br></br>
              
              <TextField
                placeholder="password"
                style={{ width: "250px", marginTop: "20px" }}
                onChange={passwordChangeHandler}
              />{" "}
              <br></br>
              <Button
                variant="contained"
                style={{ marginTop: "20px", width: "200px" }}
                onClick={(e) => twoFunctions(e)}
              >
                verify
              </Button>
            </div>
          </div>

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <TextField
                  placeholder="Enter Otp"
                  style={{ border: "1px solid black", width: "250px" }}
                  onChange={otpChangeHandler}
                />{" "}
                <br></br>
                <Button
                  variant="contained"
                  style={{
                    paddingTop: "10px",
                    marginTop: "10px",
                    width: "200px",
                  }}
                  onClick={(e) => RegisterHandler(e)}
                >
                  Register
                </Button>
              </Box>
            </Modal>
          </div>
        </div>
      )}
      {registerMsg && (
        <p style={{ fontSize: "40px", fontWeight: "bolder" }}>
          Yayyyy!!! Successfully Registered
        </p>
      )}
    </div>
  );
}

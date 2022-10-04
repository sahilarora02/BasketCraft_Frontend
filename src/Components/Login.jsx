import React from "react";
// import {CgProfile} from 'react-icons/cg'
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Store } from 'react-notifications-component';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
  const navigate = useNavigate();

  const [msg , setMsg]= useState();
  const [severity , setSeverity]= useState();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const LoginFns=(e)=>{
    handleClick()
    checkLogin(e)
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const checkLogin = async (event) => {
    event.preventDefault();
    const body = {
      Email: email,
      Password: password,
    };
    console.log(body);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const resp = await fetch("http://localhost:3002/Login", requestOptions);
      resp.json().then((data) => {
        console.log(resp.status);
        console.log(resp);
        if (resp.status === 404) {

            setMsg("User Does Not Exist")
            setSeverity("info")
          
        } else if (resp.status === 401) {

          setMsg("Wrong Email and Password")
          setSeverity("warning")
      
        } else if (resp.status === 200) {
          setMsg("")
          setSeverity("")
          Store.addNotification({
            title: "Yayy!",
            message: "Login Successfull",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1500,
              onScreen: true
            }
          });
          const letter = email.slice(0, 1);
          console.log("letter=>", letter);
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("Letter", letter);
          localStorage.setItem("id", data.user._id);
          // window.location.reload();
          navigate("/")
        }
      });
    } catch (err) {
      console.log("Err ", err);
      setMsg("Error Occured")
      setSeverity("error")
      // Store.addNotification({
      //   title: "OOPs!",
      //   message: "Error Occured",
      //   type: "danger",
      //   insert: "bottom",
      //   container: "bottom-left",
      //   animationIn: ["animate__animated", "animate__fadeIn"],
      //   animationOut: ["animate__animated", "animate__fadeOut"],
      //   dismiss: {
      //     duration: 1500,
      //     onScreen: true
      //   }
      // });
    }
  };
  return (
    <div
      style={{
        height: "500px",
        width: "350px",
        marginLeft: "550px",
        paddingTop: "1px",
        marginTop: "20px",
        borderRadius: "5px",
        borderColor: "lightgrey",
        borderWidth: "1.8px",
        boxShadow: "0 0 2px 2px #b3b3b3",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <img
          src="SignInImg.png"
          alt="SignInLogo"
          style={{ height: "100px", width: "220px", paddingLeft: "120px" }}
        />
      </div>
      <div>
        <p style={{ fontSize: "25px", paddingLeft: "120px" }}>Sign in</p>
        <p style={{ paddingTop: "15px", fontSize: "20px",paddingLeft:"20px" }}>
          * Use Your valid Email
        </p>
      </div>
      <div style={{ marginTop: "20px",marginLeft:"40px" }}>
        <TextField
          id="standard-basic"
          value={email}
          label="Email"
          variant="standard"
          onChange={emailChangeHandler}
          style={{ width: "250px" }}
        />
      </div>
      <div style={{ marginTop: "35px",marginLeft:"40px"  }}>
        <TextField
          id="standard-basic"
          value={password}
          onChange={passwordChangeHandler}
          label="Password"
          variant="standard"
          style={{ width: "250px" }}
        />
      </div>
      <div
        style={{
          justifyContent: "left",
          paddingRight: "100px",
          paddingTop: "5px",
          color: "DodgerBlue",
          fontWeight: "bold",
          marginLeft:"40px"
        }}
      >
        Forgot Password
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          justifyContent: "space-evenly",
        }}
      >
        <Link to="/signup" style={{ textDecoration: "none" }}>
          {" "}
          <a style={{ color: "#1a75ff" }}>Create Account</a>
        </Link>
        <Button
          variant="contained"
          onClick={(e) => LoginFns(e)}
          style={{ backgroundColor: "DodgerBlue" }}
        >
          Login
        </Button>
      </div>
     {msg && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>}
    </div>
  );
};

import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { Store } from 'react-notifications-component';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductDetails() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [msg , setMsg]= useState();
  const [severity , setSeverity]= useState();
  const AddtoCartFns=()=>{
    handleAdd();
    handleClick();
  }


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const location = useLocation();
  console.log("in product page => ", location.state.data.images);
  const prodId = location.state.data.id;
  const Title = location.state.data.title;
  const Price = location.state.data.price;
  const Description = location.state.data.description;

  const imagesArray = location.state.data.images;
  const Discount = location.state.data.discountPercentage;
  const ActualMRP = (100 * Price) / (100 - Discount);


const userId = localStorage.getItem("id");
  const handleAdd = async () => {
    if(userId){

      const body = {
        userId: userId,
        prodId: prodId,
        prodName: Title,
        prodPrice: Price,
        prodDescription: Description,
        prodImage: imagesArray,
        Discount: Discount,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      try {
        const resp = await fetch(
          "https://basketcrafts.herokuapp.com/AddtoCart",
          requestOptions
        );
        if (resp.status == 300) {
          setMsg("Already Added to your Cart")
          setSeverity("warning")
       
        } else if (resp.status == 200) {
          setMsg("Succesfully Added")
          setSeverity("success")
       
        }
      } catch (error) {
        console.log("error=>", error);
        setMsg("Error occured")
        setSeverity("error")
       
      }
    }else{
      setMsg("Please Login First ")
      setSeverity("warning")
     
    }

    } 


    
  const [viewImg, setViewimg] = useState(imagesArray[0]);
  console.log(viewImg);

  return (
    <div>
<AiOutlineArrowLeft onClick={() =>
                  navigate("/")
                } />
    <div
      style={{
       maxHeight: "auto",
        width: "70%",
        boxShadow: "0 0 2px 2px #cccccc",
        marginLeft: "200px",
        marginTop: "50px",
        paddingLeft: "50px",
        paddingTop: "20px",
        paddingRight: "30px",
      }}
    >
    
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <img
            src={viewImg}
            alt=""
            style={{ height: "300px", width: "300px" }}
          />
          
        </div>
        <div style={{marginLeft:"150px"}}>
          <div>
            <p style={{ fontSize: "30px", fontWeight: "bolder" }}> {Title}</p>
            <p style={{ fontSize: "20px", width: "300px" }}>{Description}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ color: "#CF0C39" }}>-{Discount}%</p>
            <p style={{ paddingLeft: "5px" }}> Rs.{Price}/- 💥</p>
          </div>
          <p>
            <s> M.R.P {Math.floor(ActualMRP)}/-</s>
          </p>
          <Button
            variant="text"
            style={{ marginLeft: "190px" }}
            onClick={ AddtoCartFns}
            
            
          >
            Add to Cart
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
         {msg}
        </Alert>
      </Snackbar>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        {imagesArray &&
          imagesArray.map((img) => (
            <div
              style={{ border: "2px solid black" }}
              onClick={() => setViewimg(img)}
            >
              <img
                src={img}
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  paddingTop: "1px",
                  paddingLeft: "1px",
                  paddingRight: "1px",
                  paddingBottom: "1px",
                }}
              />
            </div>
          ))}
      </div>
      <br></br>
    </div>
    </div>
  );
              }
 
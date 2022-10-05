import React, { useState, useEffect } from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

export default function Cart(props) {
  const [cart, setCart] = useState();
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (cart) {
      let total ;
      cart.map((item,index) => {
         total=index+1;
        console.log("index=>", index);
        console.log("total=>", total);
      });
      props.totalValue(total);
      console.log("here");
    } else {
      props.totalValue("");
    }
  }, [cart]);

  const ItemRemoveHandler = async (prodId , e) => {
    e.preventDefault();
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const resp = await fetch(
        `https://basketcrafts.herokuapp.com/DeleteItemFromCart/${prodId}`,
        requestOptions
      );
      if (resp.status == 200) {
        Store.addNotification({
          title: "Done!",
          message: "Item Deleted From your Cart",
          type: "Success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true,
          },
        });
       await fetch(`https://basketcrafts.herokuapp.com/GetYourCart/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setCart(resp));
        // window.location.reload();

      }
    } catch (error) {
      console.log("error=>", error);
      Store.addNotification({
        title: "OOPs!",
        message: "Error occured",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true,
        },
      });
    }
  };

  console.log("userId=>", userId);
  useEffect(() => {
    try {
      fetch(`https://basketcrafts.herokuapp.com/GetYourCart/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setCart(resp));
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(cart);
  return (
    <div>
      <p
        style={{ fontSize: "30px", fontWeight: "bolder", paddingLeft: "600px" }}
      >
        Your Cart
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          backgroundColor: "#F9FAFB",
          position: "relative",
          boxShadow: "0 0 2px 2px #cccccc",
          paddingLeft: "20px",
        }}
      >
        <p style={{ fontSize: "15px" }}>Your Product</p>
        <p style={{ fontSize: "15px" }}>S No.</p>
        <p style={{ fontSize: "15px" }}>Title</p>
        <p style={{ fontSize: "15px" }}>Price</p>
        {/* <p style={{fontSize:"20px"}}>Description</p> */}
        <p style={{ fontSize: "15px" }}>Details</p>
        <p
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "darkblue",
            paddingRight: "15px",
          }}
        >
          More Options
        </p>
      </div>
      {/* <hr style={{ position: "absolute", top: 160, width: "100%" }}></hr> */}

      {cart &&
        cart.map((item, index) => (
          <div>
            <div
              style={{
                height: "100px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                paddingLeft: "20px",
                paddingTop: "10px",
                // borderBottom: "1px solid #b3b3b3",
              }}
            >
              <p>{index + 1}</p>
              <img
                src={item.imageUrl[0]}
                alt=""
                style={{ height: "100px", width: "200px", paddingLeft: "65px" }}
              />
              <p style={{ width: "10px", paddingRight: "35px" }}>
                {" "}
                {item.prodName}
              </p>
              <p style={{ paddingLeft: "10px" }}> Rs.{item.prodPrice}/-</p>
              <p
                style={{ color: "darkblue", cursor: "pointer" }}
                onClick={() =>
                  navigate("/ProductDetails", {
                    state: {
                      data: {
                        title: item.prodName,
                        price: item.prodPrice,
                        description: item.prodDescription,
                        id: item.prodId,
                        images: item.imageUrl,
                        discountPercentage: item.Discount,
                      },
                    },
                  })
                }
              >
                View Details
              </p>
              <p
                style={{
                  paddingRight: "40px",
                  cursor: "pointer",
                  color: "#ffa500",
                }}
                onClick={(e) => ItemRemoveHandler(item._id , e)}
              >
                Remove Item
              </p>
            </div>
            <hr style={{ width: "100%", paddingLeft: "25px" }}></hr>
          </div>
        ))}
    </div>
  );
}

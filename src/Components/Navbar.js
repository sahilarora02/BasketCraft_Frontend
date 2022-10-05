import React, { useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsFillTelephoneFill, BsWindowSidebar } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBasketFill } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../Pages/Cart.css";
import { deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
export default function Navbar(props) {
  const userId = localStorage.getItem("id");
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState();
  const [quantity, setQuanity] = useState(1);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState();

  // const [order, setOrder] = useState();


  useEffect(() => {
    try {
      fetch(`https://basketcrafts.herokuapp.com/TotalCartItems/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setCartItem(resp));
      console.log("cartItem = >", cartItem);
    } catch (err) {
      console.log(err);
    }
  }, []);



const handlerDeleteCart = async()=>{
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },

  };

  try {
    const resp = await fetch(
      `https://basketcrafts.herokuapp.com/DeleteCart/${userId}`,
      requestOptions
    );
    if (resp.status == 200) {
    fetch(`https://basketcrafts.herokuapp.com/GetYourCart/${userId}`)
    .then((resp) => resp.json())
    .then((resp) => setCart(resp));
      
    fetch(`https://basketcrafts.herokuapp.com2/TotalCartItems/${userId}`)
    .then((resp) => resp.json())
    .then((resp) => setCartItem(resp));
    }
  } catch (error) {
    console.log("error=>", error);
  }
}


  const handleCheckOut = async() => {
    const body = {
      cartArray:cart,
      userId:userId
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),

    };

    try {
      const resp = await fetch(
        `https://basketcrafts.herokuapp.com/CheckOut`,
        requestOptions
      );
      if (resp.status == 200) {
        Store.addNotification({
          title: "YAYYYYYY!",
          message: "Order Done",
          type: "Success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1500,
            onScreen: true,
          },
        });
      handlerDeleteCart();
      }
    } catch (error) {
      console.log("error=>", error);
    }

  };

  let shippingCharge = 0;

  let stotal = 0;
  if (cart) {
    cart.map((item) => (stotal += item.prodPrice));
    console.log("total==>>>>>>", stotal);
  }
  let tax = 0.1 * stotal;
  if (stotal > 0) {
    shippingCharge = 30;
  }
  let isLogin = localStorage.getItem("isLogin");

  let letter;
  if (isLogin == 1) {
    letter = localStorage.getItem("Letter");
  }
  const [search, setSearch] = useState("");

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    props.search(search);
  };

  const freeLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  console.log("userId=>", userId);
  console.log("cart=>", cart);
  useEffect(() => {
    try {
      fetch(`https://basketcrafts.herokuapp.com/GetYourCart/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setCart(resp));

      console.log("start");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const ItemRemoveHandler = async (prodId) => {
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
        fetch(`https://basketcrafts.herokuapp.com/GetYourCart/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => setCart(resp));

          fetch(`https://basketcrafts.herokuapp.com/TotalCartItems/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => setCartItem(resp));
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#f2f2f2",
        position: "relative",
        zIndex: 2,
        paddingTop:"9px",
        height:"62px"
      }}
    >
      <Link to='/'>
      <div style={{display:"flex"}}> 
        <BsFillBasketFill style={{height:"40px",width:"40px",marginTop:"5px",color:"green"}}/>
      <p style={{ fontWeight: "bolder", paddingTop: "19px", fontSize: "20px" }}>
        BasketCrafts
      </p>
      </div>
      </Link>
      <TextField
        onChange={searchChangeHandler}
        id="standard-basic"
        label="Search Your Product "
        variant="standard"
        style={{
          width: "300px",
          paddingRight: "100px",
          position: "relative",
        }}
      />
      <BiSearchAlt2
        onClick={handleSearch}
        style={{
          paddingTop: "20px",
          position: "absolute",
          right: 740,
          height: "48px",
          width: "25px",
          cursor: "pointer",
        }}
      />
      <Link to='/ContactUs'>
      <div style={{ display: "flex", paddingTop: "8px" }}>
        <BsFillTelephoneFill
          style={{
            height: "39px",
            width: "20px",
            paddingTop: "17px",
            paddingRight: "4px",
          }}
        />
        <p style={{ marginTop: "15px" }}>Contact Us</p>
      </div>
      </Link>
      <div>
        <AiOutlineShoppingCart
          onClick={() => setShow(!show)}
          className="material-icons"
          style={{ position: "relative", cursor: "pointer" }}
        />
        {isLogin && (
          <p
            className="count"
            style={{ position: "relative", bottom: 35, left: 18 }}
          >
            {cartItem}
          </p>
        )}
      </div>
      <>
        <div style={{ width: "189px", position: "absolute", zIndex: "20" }}>
          {show && (
            <div
              className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
              style={{ width: "788px" }}
              id="chec-div"
            >
              <div
                className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
                id="checkout"
                style={{ width: "1080px" }}
              >
                <div
                  className="flex md:flex-row flex-col justify-end"
                  id="cart"
                  style={{ width: "1046px" }}
                >
                  <div
                    className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                    id="scroll"
                  >
                    <div
                      className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                      onClick={() => setShow(!show)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-left"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                      <p className="text-sm pl-2 leading-none">Back</p>
                    </div>
                    <p className="text-5xl font-black leading-10 text-gray-800 pt-7">
                      Your Cart
                    </p>
                    <div className="items-center mt-14 py-8 border-t border-gray-200">
                      {cart &&
                        cart.map((item) => (
                          <div style={{ marginBottom: "55px" }}>
                            <div className="w-1/4 pb-6">
                              <img
                                src={item.imageUrl[2]}
                                alt
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="md:pl-3 md:w-3/4">
                              <div className="flex items-center justify-between w-full pt-1">
                                <p className="text-xl font-black leading-none text-gray-800">
                                  {item.prodName}
                                </p>
                              </div>
                              <div
                                style={{
                                  marginTop: "20px",
                                }}
                              >
                                <p className="w-126 text-base leading-5 text-gray-600">
                                  Description: {item.prodDescription}
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-5 pr-6">
                                <div className="flex itemms-center">
                                  <p
                                    className="text-base leading-3  underline text-gray-800 cursor-pointer"
                                    onClick={() =>
                                      navigate("/ProductView", {
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
                                    View Product
                                  </p>
                                  <p
                                    className="text-base leading-3 underline text-red-500 pl-5 cursor-pointer"
                                    onClick={() => ItemRemoveHandler(item._id)}
                                  >
                                    Remove
                                  </p>
                                </div>
                                <p className="text-base font-black leading-none text-gray-800">
                                  Rs. {item.prodPrice}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className=" md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                    <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto" style={{paddingTop:"45px"}}>
                      <div>
                        <p className="text-4xl font-black leading-9 text-gray-800" style={{zIndex:20}}>
                          Summary
                        </p>
                        <div className="flex items-center justify-between pt-16">
                          <p className="text-base leading-none text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            Rs. {Math.floor(stotal)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-5">
                          <p className="text-base leading-none text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            Rs. {shippingCharge}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-5">
                          <p className="text-base leading-none text-gray-800">
                            Tax
                          </p>
                          <p className="text-base leading-none text-gray-800">
                            Rs.{Math.floor(tax)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                          <p className="text-2xl leading-normal text-gray-800">
                            Total
                          </p>
                          <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                            Rs.{Math.floor(stotal + shippingCharge + tax)}
                          </p>
                        </div>
                        <button
                          onClick={()=>handleCheckOut()}
                          // onClick={() => setShow(!show)}
                          className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                        >
                          Checkout
                        </button>
                        {/* <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              This Service is not Available Right Now!!!
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              We are working on this😀
                            </Typography>
                          </Box>
                        </Modal> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>
          {` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
        </style>
      </>

      {/* </div> */}
      <div style={{ paddingTop: "8px" }}>
        {isLogin && (
          <div className="dropdown">
            {" "}
            <Avatar
              className="dropbtn"
              sx={{ bgcolor: deepOrange[500] }}
              style={{ marginTop: "12px", height: "30px", width: "30px",marginRight:"99px" }}
            >
              {letter}
            </Avatar>
            <div className="dropdown-content">
              <Link to="/OrderHistory">
                {" "}
                <p>Order History</p>{" "}
              </Link>
              <p onClick={freeLocalStorage} style={{ cursor: "pointer" }}>
                Logout
              </p>
            </div>
          </div>
        )}
        {!isLogin && (
          <div style={{ display: "flex",marginRight:"40px" }}>
            <CgProfile
              style={{ paddingTop: "15px", height: "42px", width: "20px" }}
            />
            <Link to="/SignUp" style={{ textDecoration: "none" }}>
              <p
                style={{
                  color: "black",
                  paddingLeft: "5px",
                  paddingTop: "15px",
                }}
              >
                Sign In
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

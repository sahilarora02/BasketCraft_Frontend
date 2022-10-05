import React from "react";
import Slider from "react-slick";
import { Alert, Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import FAQs from "../Components/FAQs";
import { useEffect } from "react";
import { useState } from "react";
import { Store } from "react-notifications-component";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function MainPage(props) {
  const [products, setproducts] = useState();
  const [categories, setCategories] = useState();
  const [quote, setQuote] = useState();
  const navigate = useNavigate();

  const ColorArray = ["#4d4dff", "#8080ff", "#CC0C39", "#ff6600", "#33cc33"];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const id = localStorage.getItem("id");
  console.log("id=>>", id);
  const handleAdd = async (addData) => {
    if (id) {
      const body = {
        userId: id,
        prodId: addData.id,
        prodName: addData.title,
        prodPrice: addData.price,
        prodDescription: addData.description,
        prodImage: addData.images,
        Discount: addData.discountPercentage,
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
          // alert("Already Added to your Cart");
          Store.addNotification({
            title: "OOPs!",
            message: "Already Added to your Cart",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1000,
              onScreen: true,
            },
          });
        } else if (resp.status == 200) {
          Store.addNotification({
            title: "Yayy!",
            message: "Succesfully Added",
            type: "success",
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
      } catch (error) {
        console.log("error=>", error);
        Store.addNotification({
          title: "OOPs!",
          message: "Error occured",
          type: "danger",
          insert: "bottom",
          container: "bottom-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true,
          },
        });
      }
    } else {
      Store.addNotification({
        title: "OOPs!",
        message: "Please Login First  ",
        type: "warning",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true,
        },
      });
    }
  };

  useEffect(() => {
    try {
      fetch("https://dummyjson.com/quotes/random")
        .then((resp) => resp.json())
        .then((resp) => setQuote(resp));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const GetCategoryWise = async (category) => {
    try {
      await fetch(`https://dummyjson.com/products/category/${category}`)
        .then((resp) => resp.json())
        .then((resp) => setproducts(resp));
      window.scrollTo(0, 700);
    } catch (err) {
      console.log("Err ", err);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log("Hoo");


  useEffect(() => {
    try {
      console.log("reach");
      fetch("https://dummyjson.com/products")
        .then((resp) => resp.json())
        .then((resp) => setproducts(resp));

      fetch("https://dummyjson.com/products/categories")
        .then((resp) => resp.json())
        .then((resp) => setCategories(resp));

      console.log("teach");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const searchFunc = async (prodType) => {
    if (prodType) {
      console.log(prodType);
      try {
        await fetch(`https://dummyjson.com/products/search?q=${prodType}`)
          .then((resp) => resp.json())
          .then((resp) => setproducts(resp));
        window.scrollTo(0, 700);
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Navbar search={searchFunc}  />
      <div
        style={{
          backgroundColor: "#232F3E",
          height: "54px",
          paddingTop: "15px",
          paddingLeft: "25px",
          marginTop:"20px"
        }}
      >
        {categories ? (
          <Carousel responsive={responsive}>
            {categories &&
              categories.map((catName, i) => (
                <>
                  <h6
                    style={{ color: "#FFFFFF", cursor: "pointer",width:"  " }}
                    onClick={() => GetCategoryWise(catName)}
                  >
                    {" "}
                    {catName}{" "}
                  </h6>
                </>
              ))}
          </Carousel>
        ) : (
          ""
        )}
      </div>

      <div className="slider">
        <Slider {...settings}>
          <div>
            <img
              src="Banner1.jpeg"
              alt=""
              style={{ height: "350px", width: "100%"}}
            />
          </div>
          <div>
            <img
              src="Banner2.jpeg"
              alt=""
              style={{ height: "350px", width: "100%" }}
            />
          </div>
          <div>
            <img
              src="Banner3.jpeg"
              alt=""
              style={{ height: "350px", width: "100%"}}
            />
          </div>
        </Slider>
      </div>
      {/* <p
        style={{
          paddingLeft: "560px",
          paddingTop: "50px",
          fontSize: "30px",
          fontWeight: "bolder",
        }}
      >
        Categories
      </p> */}
      <br></br>

      <div
        style={{
          maxheight: "auto",
          boxShadow: "0 0 3px 3px #80b3ff",
          backgroundImage:
            "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
          width: "50%",
          marginLeft: "355px",
          marginTop: "30px",
        }}
      >
        <p
          style={{
            fontWeight: "bolder",
            paddingLeft: "240px",
            paddingTop: "20px",
            fontSize: "20px",
            color: "white",
          }}
        >
          {" "}
          Today's Quote :{" "}
        </p>
        {quote && (
          <div
            style={{
              color: "white",
              paddingBottom: "20px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              {" "}
              <i>{quote.quote}</i>{" "}
            </p>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          paddingLeft: "60px",
          paddingTop: "25px",
          justifyContent: "space-around",
          paddingRight: "5px",
          marginBottom: "15px",
        }}
      >
        {products &&
          products.products.map((item) => (
            <div>
              <div
                style={{
                  height: "350px",
                  width: "300px",
                  boxShadow: "0 0 3px 3px #bfbfbf",
                  marginTop: "25px",
                  paddingBottom: "10px",
                  paddingRight: "10px",
                  paddingTop: "15px",
                  // cursor: "pointer",
                  backgroundColor: "white",
                  position: "relative",
                  // zIndex:-1
                }}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{
                    height: "150px",
                    width: "220px",
                    paddingLeft: "75px",
                  }}
                />
                <br></br>
                <hr
                  style={{
                    width: "70%",
                    border: "1px solid black",
                    marginLeft: "45px",
                  }}
                ></hr>
                <br></br>

                <p style={{ paddingLeft: "20px", fontWeight: "bold" }}>
                  Title : {item.title}{" "}
                </p>
                <div style={{ display: "flex" }}>
                  <p style={{ paddingLeft: "20px" }}>
                    Rs.{Math.floor(item.price)}/-
                  </p>
                </div>
                <p style={{ paddingLeft: "20px", fontWeight: "bolder" }}>
                  Stock Available : {item.stock}
                </p>

                <button
                  style={{ position: "absolute", bottom: 0, marginTop: "20px" }}
                  className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-8 "
                  onClick={() =>
                    navigate("/ProductView", {
                      state: {
                        data: item,
                      },
                    })
                  }
                >
                  View Product
                </button>
              </div>
            </div>
            // </Link>
          ))}
      </div>
      <br></br>
      {/* <FAQs /> */}
      <ScrollToTop smooth color="Darkblue" width="40" style={{ zIndex: 1 }} />
    </div>
  );
}

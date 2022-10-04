import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orderedList, setOrderedList] = useState();
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");
  useEffect(() => {
    try {
      fetch(`http://localhost:3002/GetOrderedList/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setOrderedList(resp));
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log("orderedList=>", orderedList);

  return (
    <div>
      <p
        style={{ fontSize: "50px", fontWeight: "bolder", marginLeft: "500px" }}
      >
        History of Orders
      </p>
      <div style={{ marginLeft: "300px" }}>
        {orderedList &&
          orderedList.map((item) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                boxShadow: "0 0 2px 2px",
                width: "60%",
                margin: "100px",
                padding:"40px",
                boxShadow:"0 0 4px 4px #b3b3b3"
              }}
            >
              <div style={{ justifyContent: "center" }}>
                <img
                  src={item.imageUrl[2]}
                  alt=""
                  style={{ height: "160px", width: "160px" }}
                />
                <p style={{ fontSize: "20px" }}>{item.prodName}</p>
              </div>
              <div
                style={{
                  justifyContent: "space-evenly",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontSize: "20px" }}>
                  Price : Rs.{item.prodPrice}/-
                </p>
                <p
                  style={{ fontSize: "20px" ,cursor:"pointer" ,color:"blue" }}
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
                  {" "}
                  View Product{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

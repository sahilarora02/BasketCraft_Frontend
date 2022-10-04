import "./App.css";
import MainPage from "./Pages/MainPage";
// import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import { Login } from "./Components/Login";
import Cart from "./Pages/Cart";
import ProductDetails from "./Components/ProductDetails";
import { ReactNotifications } from 'react-notifications-component'
import Footer from "./Components/Footer";
import ProductView from "./Components/ProductView";
import CartPage from "./Pages/CartPage";
import SignInUp from "./Pages/SignInUp";
import OrderHistory from "./Pages/OrderHistory";
import ContactUs from "./Pages/ContactUs";

function App() { 
 
  const handleProduct = (details)=>{
console.log("details=>",details);
  }
const cartItemsApp = (total)=>{
  console.log("Total Item =>",total);
}
  return (
    <div style = {{backgroundColor:"f2f2f2"}}>
<ReactNotifications />
      <Routes>
        <Route path="/" element={<MainPage  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/SignInUp" element={<SignInUp/>} />
        <Route path="/Cart" element={<Cart totalValue = {()=>cartItemsApp()} />} />
        <Route path="/CartPage" element={<CartPage/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/ProductView" element = {<ProductView/>} />
        <Route path="/OrderHistory" element = {<OrderHistory/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

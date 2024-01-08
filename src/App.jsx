// import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/containers/MainPage";
import OrderPage from "./components/containers/OrderPage";
import UserCart from "./components/containers/UserCart";
import Chackout from "./components/Chackout";
import OrderSucess from "./components/OrderSucess";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/cart/checkout" element={<Chackout />} />
          <Route path="/Order-sucess" element={<OrderSucess />} />
          <Route path="/Admin/Orders" element={<OrderPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

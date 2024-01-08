import { ShoppingCart } from "lucide-react";
import logo from "../assets/images/logo.svg";
import { useSelector } from "react-redux";
// import { useState } from "react";

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  return (
    <div className="md:ml-6 mt-2 ml-4">
      <div className="bg-[#0000001a] backdrop-blur-lg shadow-xl backdrop-filter-[10px] w-[95%] h-[70px] rounded-lg flex items-center justify-between px-2 py-3">
        <div className="w-[120px] h-full ml-3">
          <a href="/">
            <img src={logo} alt="logo" className="w-full h-full" />
          </a>
        </div>
        <div className="mr-4 hidden md:block">
          <a href="/">
            <span className="mr-8 font-bold text-lg text-[#f97162]">Menu</span>
          </a>
          <a href="/cart">
            <button className="bg-[#f97162] font-bold text-white px-3 py-2 rounded-md">
              <ShoppingCart />
            </button>
          </a>
        </div>
        <div className="mr-5 hover:bg-[#00000029] px-3 py-2 md:hidden rounded-md">
          <a href="/cart">
            <button>
              <span className="absolute flex items-center justify-center top-0 right-6 text-white w-[25px] h-[25px] rounded-full bg-[#f97162]">
                {cartTotalQuantity}
              </span>
              <ShoppingCart />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

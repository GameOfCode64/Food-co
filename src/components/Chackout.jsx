import { formatCurrency } from "../utils/currencyFromate";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import console from "console";
import { useState } from "react";

const Chackout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handelDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  // HeandelSubmit
  const [Username, setUsername] = useState("");
  const [TabelNo, setTabelNo] = useState("");
  const data = localStorage.getItem("cartItems");
  const storedCartData = JSON.parse(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://wpl-backend-gold.vercel.app/cart",
        {
          Username,
          cartData: storedCartData,
          TabelNo,
        }
      );

      localStorage.removeItem("cartItems");
      history("/order-sucess");
      window.location.reload();
      console.log("ok", response.data);
    } catch (error) {
      console.error("Error posting cart data to server:", error);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="md:basis-[70%] w-full">
          <Navbar />
          <h1 className="text-center py-8 font-[900] text-[44px] text-[#f97162]">
            Checkout
          </h1>
          <div className="px-4 py-4 flex items-center justify-center">
            <div className="border-[1px] px-6 py-12 h-[240px] w-[340px] rounded-md shadow-md">
              <form>
                <div className="w-full h-[45px]">
                  <input
                    type="text"
                    name="Username"
                    placeholder="Enter Your Name"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="outline-none px-2 w-full rounded-md h-full border-[1px] focus:border-[3px] border-[#f97162]"
                  />
                </div>
                <div className="mt-4 w-full h-[45px]">
                  <input
                    type="text"
                    onChange={(e) => {
                      setTabelNo(e.target.value);
                    }}
                    name="TabelNo"
                    placeholder="Enter Tabel Number"
                    className="outline-none px-2 w-full rounded-md h-full border-[1px] focus:border-[3px] border-[#f97162]"
                  />
                </div>
                <div className="w-full mt-4">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-[#f97162] w-full py-2 rounded-md text-white font-bold"
                  >
                    Order Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="basis-[30%] md:block hidden px-3 py-4 fixed right-0 w-[30%]">
          <div className="flxe items-center justify-center">
            <p className="absolute top-3 left-5 bg-[#f97162] px-3 py-3 rounded-full text-white">
              <ShoppingCart size={24} />
              <span className="absolute flex items-center justify-center rounded-full w-[25px] h-[25px] bg-red-500 top-[-8px] right-0">
                {cartTotalQuantity}
              </span>
            </p>
            <h1 className="text-center font-[900] text-[#f97162] text-[24px]">
              Your Cart
            </h1>
          </div>
          <hr className="h-[2px] bg-[#f97162] mt-7" />
          <div className="w-full h-[360px] mt-3 overflow-y-scroll scrollbar-none">
            {cart.cartItems.length === 0 ? (
              <>
                <div className="h-full flex items-center justify-center">
                  <h1 className=" font-[900] text-lg text-[#f97162]">
                    Your Cart is Empty!
                    <p className="text-center mt-5 text-[32px]">😔</p>
                  </h1>
                </div>
              </>
            ) : (
              <>
                {cart.cartItems?.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="w-full h-[90px] mb-3 rounded-lg bg-[#00000000] backdrop-filter-[10px] backdrop-blur-2xl shadow-md flex items-center justify-between px-2"
                  >
                    <div className="w-[90px] h-[75px] px-2 rounded-lg bg-[#00000013] backdrop-filter-[5px] backdrop-blur-lg flex items-center justify-center">
                      <img src={cartItem.imgUrl} className="w-full h-full" />
                    </div>
                    <div className="">
                      <p className="font-bold text-lg text-[#f97162]">
                        {cartItem.name}
                      </p>
                      <p className="font-bold text-lg text-emerald-500">
                        {formatCurrency(cartItem.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handelDecreaseCart(cartItem)}
                        className="px-[2px] py-[2px] rounded-lg bg-[#f97162] text-white"
                      >
                        <MinusIcon />
                      </button>
                      <p className="font-bold text-lg">
                        {cartItem.cartQuantity}
                      </p>
                      <button
                        onClick={() => handleAddToCart(cartItem)}
                        className="px-[2px] py-[2px] rounded-lg bg-[#f97162] text-white"
                      >
                        <PlusIcon />
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className="px-[2px] ml-3 py-[2px] rounded-lg bg-[#f97162] text-white"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mt-3">
            <hr className="h-[2px] mb-3 bg-[#f97162]" />
            <div className="flex items-center justify-between">
              <h1 className="text-[17px] font-[900] text-[#f97162]">Total</h1>
              <h1 className="text-[17px] font-[900] text-emerald-500">
                {formatCurrency(cart.cartTotalAmount)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chackout;

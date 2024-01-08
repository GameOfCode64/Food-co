import { formatCurrency } from "../../utils/currencyFromate";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar";
import { ArrowLeft, MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../features/cartSlice";
import { useEffect } from "react";
const UserCart = () => {
  const quantity = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [quantity]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handelDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handelClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center font-[900] text-[#f97162] text-[24px] mt-5">
        Your Cart
      </h1>
      {quantity.cartItems.length === 0 ? (
        <>
          <div className="px-8 py-8 text-center">Cart is Empty!</div>
        </>
      ) : (
        <>
          <div className="px-8 py-4 w-full">
            <div className="grid grid-cols-4 w-full">
              <h3 className=" text-center font-bold text-[#1b1b1b]">Product</h3>
              <h3 className=" text-center font-bold text-[#1b1b1b]">Price</h3>
              <h3 className=" text-center font-bold text-[#1b1b1b]">
                Quantity
              </h3>
              <h3 className=" text-center font-bold text-[#1b1b1b]">Total</h3>
            </div>
            <div className="mt-4">
              <hr className="bg-[#ccc] h-[1px] mb-4 px-8" />
              {quantity.cartItems?.map((cartItem) => (
                <div
                  className="grid grid-cols-4 mt-4 overflow-x-scroll"
                  key={cartItem.id}
                >
                  <div className="md:gap-3 gap-2 w-full flex items-center justify-center">
                    <div className="md:w-[90px] w-[45px] h-[45px] md:h-[90px]">
                      <img
                        src={cartItem.imgUrl}
                        alt="cartimg"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="md:gap-3 gap-2w-full flex items-center justify-center">
                    <p className="text-emerald-500 font-bold">
                      {formatCurrency(cartItem.price)}
                    </p>
                  </div>
                  <div className="md:gap-3 gap-1 w-full flex items-center justify-center">
                    <div className="md:gap-3 gap-1 flex">
                      <button
                        onClick={() => handelDecreaseCart(cartItem)}
                        className="md:px-1 px-[2px] md:py-[2px] py-1 rounded-md text-white bg-[#f97162]"
                      >
                        <MinusIcon />
                      </button>
                      <p className="font-bold md:text-lg text-lg">
                        {cartItem.cartQuantity}
                      </p>
                      <button
                        onClick={() => handleAddToCart(cartItem)}
                        className="px-1 py-1 rounded-md text-white bg-[#f97162]"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <div className="md:gap-3 gap-1 w-full flex items-center justify-center">
                    <h3 className="text-emerald-500 font-bold">
                      {formatCurrency(cartItem.price * cartItem.cartQuantity)}
                    </h3>
                    <button
                      onClick={() => handleRemoveFromCart(cartItem)}
                      className="absolute md:right-12 right-2 rounded-md text-white md:py-2 py-[2px] px-[2px] bg-[#f97162] md:px-2"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
              <hr className="bg-[#ccc] h-[1px] mt-8 px-8" />
              <div className="md:flex inline-block items-center justify-between px-6 py-8">
                <div className="">
                  <button
                    onClick={() => handelClearCart()}
                    className="border-[1px] border-[#ccc] px-6 py-2 rounded-md font-bold bg-[#f97162] text-white"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="md:w-[300px] w-auto mt-8 md:mt-0 h-auto px-3 py-2 rounded-md shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Subtotal</p>
                    <p className="font-bold text-emerald-500">
                      {formatCurrency(quantity.cartTotalAmount)}
                    </p>
                  </div>
                  <p className="mt-2 text-center text-[14px] text-[#ccc]">
                    Texes and shapping calculated at checkout
                  </p>
                  <a href="/cart/checkout">
                    <button className="mt-2 w-full bg-[#f97162] py-2 rounded-lg text-white font-bold">
                      Checkout
                    </button>
                  </a>
                  <a href="/">
                    <div className="mt-4 flex items-center justify-start">
                      <ArrowLeft className="text-[#ccc]" />
                      <p className="ml-2 text-[14px]">Continue Shopping</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserCart;

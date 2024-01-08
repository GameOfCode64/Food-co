import { formatCurrency } from "../utils/currencyFromate";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const quantity = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [quantity]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handelDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  // handleAddToCart
  const handleAddToCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  return (
    <div className="px-3 py-4">
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
        {quantity.cartItems.length === 0 ? (
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
            {quantity.cartItems?.map((cartItem) => (
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
                  <p className="font-bold text-lg">{cartItem.cartQuantity}</p>
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
        <div className="flex items-center justify-between">
          <h1 className="text-[17px] font-[900] text-[#f97162]">Total</h1>
          <h1 className="text-[17px] font-[900] text-emerald-500">
            {formatCurrency(quantity.cartTotalAmount)}
          </h1>
        </div>
        <a href="/cart">
          <button className="w-full py-3 rounded-lg bg-[#f97152] font-bold text-white mt-2">
            Order Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Cart;

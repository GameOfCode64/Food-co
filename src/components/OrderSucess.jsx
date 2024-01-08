import Navbar from "./Navbar";
import sucess from "../assets/images/verified.png";

const OrderSucess = () => {
  return (
    <>
      <Navbar />
      <div className="w-full px-8 h-screen py-3">
        <div className="mt-8 flex items-center justify-center">
          <div className="w-[120px] h-[120px]">
            <img src={sucess} alt="sucess" />
          </div>
        </div>
        <h1 className="text-[44px] text-center font-bold">
          Order Placed successfully
        </h1>
        <div className="flex items-center justify-center mt-12">
          <a href="/" className="">
            <button className=" text-white font-bold bg-[#f97162] px-8 rounded-md py-2">
              Back
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default OrderSucess;

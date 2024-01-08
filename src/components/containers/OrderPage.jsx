import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/currencyFromate";
import axios from "axios";
import Navbar from "../Navbar";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://wpl-backend-gold.vercel.app/getOrders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-8">
        <h1 className="text-[44px] font-bold text-center text-[#f97162]">
          Orders
        </h1>
        {orders.map((items) => (
          <div className="my-6" key={items._id}>
            <div className="px-8">
              <div className="w-full h-auto bg-[#00000024] rounded-md">
                <div className="flex">
                  <div className="h-full  basis-[30%]">
                    <div className="grid grid-cols-2 text-center">
                      <div className="h-full">
                        <p className="font-bold text-[#f97162]">Name</p>
                        <p className="font-semibold mt-[55px] text-indigo-500">
                          {items.Username}
                        </p>
                      </div>
                      <div className="">
                        <p className="font-bold text-[#f97162]">Tabel No</p>
                        <p className="font-semibold mt-[55px] text-indigo-500">
                          {items.TabelNo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="basis-[70%] h-full overflow-y-scroll scrollbar-none">
                    <div className="grid grid-cols-4">
                      <div className=" font-semibold text-[#f97162]">
                        Product Image
                      </div>
                      <div className=" font-semibold text-[#f97162]">
                        Product Name
                      </div>
                      <div className=" font-semibold text-[#f97162]">
                        Quantity
                      </div>
                      <div className=" font-semibold text-[#f97162]">
                        Total Price
                      </div>
                    </div>
                    {Array.isArray(items.cartData) &&
                      items.cartData.map((cartItem) => (
                        <div key={cartItem._id}>
                          <div className="grid grid-cols-4">
                            <div className="w-[50px] rounded-lg h-[50px] my-4 bg-[#00000028]">
                              <img
                                src={cartItem.imgUrl}
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="font-semibold mt-8 text-indigo-500">
                                {cartItem.name}
                              </p>
                            </div>
                            <div className="ml-6">
                              <p className="font-semibold mt-8 text-indigo-500">
                                {cartItem.cartQuantity}
                              </p>
                            </div>
                            <div className="ml-3">
                              <p className="font-semibold mt-8 text-emerald-500">
                                {formatCurrency(
                                  cartItem.cartQuantity * cartItem.price
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderPage;

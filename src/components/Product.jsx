import { formatCurrency } from "../utils/currencyFromate";

import { useGetAllProductsQuery } from "../features/productsApi";
import Loader from "./Lodder";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cartSlice";
import { ShoppingCartIcon } from "lucide-react";

const Product = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-xl flex items-center justify-center">Error</p>
      ) : (
        <div>
          {data?.map((product) => (
            <div
              className="w-full h-[120px] bg-[#0000001e] backdrop-blur-2xl backdrop-filter-[10px] shadow-lg mt-3 rounded-lg flex items-center justify-between px-4"
              key={product.id}
            >
              <div className="w-[90px] h-[90px] bg-[#ffffff81] rounded-lg backdrop-blur-2xl shadow-xl backdrop-filter-[10px]  p-2">
                <img
                  src={product.imgUrl}
                  className="w-full h-full"
                  alt={`Product: ${product.name}`}
                />
              </div>
              <div className="inline-block">
                <span className="text-lg font-[900] text-[#f97162]">
                  {product.name}
                </span>
                <p className="text-sm hidden md:block font-[500] text-gray-500">
                  {product.desc}
                </p>
                <p className="font-bold text-emerald-500">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="md:mr-8 mr-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#f97162] hidden md:block px-4 py-3 text-white rounded-lg font-bold"
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#f97162] md:hidden px-4 py-3 text-white rounded-lg font-bold"
                >
                  <ShoppingCartIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Product;

import Cart from "../Cart";
import Navbar from "../Navbar";
import Product from "../Product";

const MainPage = () => {
  return (
    <div className="flex justify-between h-screen">
      <div className="md:basis-[70%] basis-[100%] w-full">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="md:py-12 md:px-8 py-0 px-0">
          <h1 className="text-center text-[50px] font-[900] text-[#f97162]">
            Our Menu
          </h1>
          <div className="py-8 px-2">
            <Product />
          </div>
        </div>
      </div>
      <div className="hidden border md:basis-[30%] md:block fixed w-[30%] right-0 h-screen rounded-lg bg-[#00000021] shadow-2xl backdrop-filter-[10px] backdrop-blur-2xl ">
        <Cart />
      </div>
    </div>
  );
};

export default MainPage;

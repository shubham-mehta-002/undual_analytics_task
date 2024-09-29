'use client'

import Products from "./components/products";
import Categories from "./components/categories";
import Pagination from "./components/pagination";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import SearchInput from "./components/searchInput"

export default function Home() {
  const [showCategoriesMenuInMobile, setShowCategoriesMenuInMobile] = useState(false);
  
  return (
    <div>
      <div className="px-2 w-full md:mx-auto  md:w-[90%]  bg-white mx-auto ">
        {/* header */}
        <div className="header mt-[60px] h-[80px] flex flex-row items-center justify-between gap-10 relative">
          <div className="w-[50%] text-4xl font-bold text-left">
            All Products
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <span>
              <CiFilter
                className="ml-1 h-6 w-6 lg:hidden"
                  onClick={() => setShowCategoriesMenuInMobile((previousValue) => !previousValue)}
              />
            </span>
          </div>
          
        </div>
        <hr className="text-[#E5E7EB]" />
        <SearchInput/>


        <div className="mt-20 products-wrappper flex flex-row  gap-10 relative">
          <Categories
            showCategoriesMenuInMobile = {showCategoriesMenuInMobile}
            setShowCategoriesMenuInMobile={setShowCategoriesMenuInMobile}
            ></Categories>
          <Products></Products>
        </div>
      <Pagination></Pagination>

      </div>
    </div>
  );
}

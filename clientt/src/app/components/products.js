"use client";

import { useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../constants/api";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectProducts,
} from "../lib/store/features/product/productSlice";
import { setProducts } from "../lib/store/features/product/productSlice";
import { selectPage, selectSearchCategories, selectSearchInput } from "../lib/store/features/filters/filtersSlice";
import ProductCard from "./productCard";


export default function Products() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage) || 1;
  const searchCategories = useAppSelector(selectSearchCategories)
  const searchInput  =useAppSelector(selectSearchInput)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log([page]);
        let queryString = '' 
        if(searchCategories.length){
            queryString = searchCategories.map(category => `category=${category}`).join('&');
        }

        if(searchInput.trim()!==''){
          queryString += `search=${searchInput}&`
        }
        console.log({queryString})
        queryString.slice(-1)
        const response = await axios.get(
          `${BASE_URI}/products?page=${page}&limit=10&${queryString}`
        );
        if (response.data.success) {
          console.log({ response: response.data });
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const timeOut = setTimeout(() => {
      fetchProducts(); // Call the async function
    }, 500);

    return () => clearTimeout(timeOut); // Cleanup timeout on unmount or dependency change
  }, [dispatch, page,searchCategories,searchInput]);

  const products = useAppSelector(selectProducts);
  console.log({ products });

  return (
    <div className="wrapper w-[100%] lg:w-[70%] ">
      {products && products.length === 0 ? (
        <div className="block text-black text-3xl font-semibold">
          No product found{" "}
        </div>
      ) : (
        <div className="products-container w-full grid grid-cols-2 md:grid-cols-3  ">
          {products?.map((product, index) => (
            <div ley={index} className="flex items-center justify-center mb-2">
              <ProductCard key={product.id} {...product} />
            </div>
          ))}
        </div>
      )}

      <hr className="mt-10 border-gray-400"></hr>
    </div>
  );
}

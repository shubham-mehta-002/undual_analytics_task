"use client";

import { useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../constants/api";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { selectProducts } from "../lib/store/features/product/productSlice";
import { setProducts } from "../lib/store/features/product/productSlice";
import {
  selectPage,
  selectSearchCategories,
  selectSearchInput,
} from "../lib/store/features/filters/filtersSlice";
import { selectProductFetchStatus } from "../lib/store/features/product/productSlice";
import ProductCard from "./productCard";

export default function Products() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage) || 1;
  const searchCategories = useAppSelector(selectSearchCategories);
  const searchInput = useAppSelector(selectSearchInput);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let queryString = "";
        if (searchCategories.length) {
          queryString = searchCategories
            .map((category) => `category=${category}&`)
        }

        if (searchInput.trim() !== "") {
          queryString += `search=${searchInput}&`;
        }

        queryString.slice(-1);
        const response = await axios.get(
          `${BASE_URI}/products?page=${page}&limit=10&${queryString}`
        );
        if (response.data.success) {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const timeOut = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeOut);
  }, [dispatch, page, searchCategories, searchInput]);

  const products = useAppSelector(selectProducts);

  return (
    <div className="wrapper w-[100%] lg:w-[70%] ">
      {products && products.length === 0 ? (
        <div className="block text-black text-3xl font-semibold">
          No product found{" "}
        </div>
      ) : (
        <div className="products-container w-full grid grid-cols-2 md:grid-cols-3  ">
          {products?.map((product, index) => (
            <div key={index} className="flex items-center justify-evenly mb-2">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}

      <hr className="mt-10 border-gray-400"></hr>
    </div>
  );
}

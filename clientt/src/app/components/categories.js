"use client";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectCategories,
  setCategories,
} from "../lib/store/features/category/categorySlice";
import {
  addSearchCategory,
  removeSearchCategory,
  selectSearchCategories,
} from "../lib/store/features/filters/filtersSlice";
import axios from "axios";
import { BASE_URI } from "../constants/api";

export default function Categories({
  showCategoriesMenuInMobile,
  setShowCategoriesMenuInMobile,
}) {
  const dispatch = useAppDispatch();
  const searchCategories = useAppSelector(selectSearchCategories);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${BASE_URI}/category`);
        if (response.data.success) {
          dispatch(setCategories(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, [dispatch]);

  function categoryHandler(slug) {
    if (searchCategories.includes(slug)) {
      dispatch(removeSearchCategory(slug));
    } else {
      dispatch(addSearchCategory(slug));
    }
  }

  const categories = useAppSelector(selectCategories);

  return (
    <>
      <div className="categories-wrappper flex flex-row gap-20 lg:w-[25%] relative">
        <DesktopFilters
          categories={categories}
          categoryHandler={categoryHandler}
          searchCategories={searchCategories}
        />
      </div>
      <MobileFilters
        categories={categories}
        showCategoriesMenuInMobile={showCategoriesMenuInMobile}
        setShowCategoriesMenuInMobile={setShowCategoriesMenuInMobile}
        categoryHandler={categoryHandler}
        searchCategories={searchCategories}
      />
    </>
  );
}

function DesktopFilters({ categories, categoryHandler, searchCategories }) {
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);

  return (
    <div className="filters hidden lg:block w-full ">
      <div
        className="text-black flex flex-row justify-between px-3 py-4 cursor-pointer"
        onClick={() => setShowCategoryFilters((prevValue) => !prevValue)}
      >
        <span className="font-semibold text-xl">Category</span>
        <span className="font-semibold text-lg">
          {showCategoryFilters ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
      <div
        className={`${
          showCategoryFilters ? "flex" : "hidden"
        } category-filters-wrapper w-full flex flex-col items-center`}
      >
        {categories.map(({ name, slug }, index) => {
          const isChecked = searchCategories.includes(slug);
          return (
            <label
              key={index}
              className="flex w-full flex-row items-center gap-3 h-[40px]"
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                value={slug}
                checked={isChecked}
                onChange={() => categoryHandler(slug)}
              />
              <span className="font-light text-lg">{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function MobileFilters({
  categories,
  showCategoriesMenuInMobile,
  setShowCategoriesMenuInMobile,
  categoryHandler,
  searchCategories,
}) {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div
      className={`${
        showCategoriesMenuInMobile ? "flex" : "hidden"
      } lg:hidden mobile-filters-container h-full w-full vsm:w-[380px] shadow-2xl top-0 right-0 fixed bg-white z-50 flex flex-col overflow-y-scroll`}
    >
      <div className="h-[80px] flex flex-row justify-between items-center p-5 ">
        <span className="font-semibold text-xl">Filters</span>
        <RxCross1
          className="font-semibold text-xl cursor-pointer"
          onClick={() => setShowCategoriesMenuInMobile(false)}
        />
      </div>
      <hr className="border-gray-400" />
      <div
        className="h-[80px] flex flex-row justify-between items-center p-5 "
        onClick={() => setShowCategories((prev) => !prev)}
      >
        <span className="font-semibold text-xl">Category</span>
        {showCategories ? (
          <FaMinus className="font-semibold text-xl cursor-pointer" />
        ) : (
          <FaPlus className="font-semibold text-xl cursor-pointer" />
        )}
      </div>
      <div
        className={`${
          showCategories ? "flex" : "hidden"
        } category-filters-wrapper w-full flex flex-col items-center pl-4 pb-4`}
      >
        {categories.map(({ name, slug }, index) => {
          const isChecked = searchCategories.includes(slug);
          return (
            <label
              key={index}
              className="flex w-full flex-row items-center gap-3 h-[40px]"
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                value={slug}
                checked={isChecked}
                onChange={() => categoryHandler(slug)}
              />
              <span className="font-light text-lg">{name}</span>
            </label>
          );
        })}
      </div>
      <hr className="border-gray-400" />
    </div>
  );
}

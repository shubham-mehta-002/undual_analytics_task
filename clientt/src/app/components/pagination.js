"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  selectPage,
  setPage,
} from "../lib/store/features/filters/filtersSlice";
import { selectTotalProductsCount } from "../lib/store/features/product/productSlice";

export default function Pagination() {

  const ITEMS_PER_PAGE = 10;
  const dispatch = useAppDispatch();
  const totalDocs = useAppSelector(selectTotalProductsCount);
  const numberOfPages = Math.ceil(totalDocs / ITEMS_PER_PAGE);

  const pageNumberArray = [];
  for (let i = 0; i < numberOfPages; i++) pageNumberArray.push(i + 1);

  const page = useAppSelector(selectPage);

  function handlePageChange(page) {
    console.log(page);
    dispatch(setPage(page));
  }

  return (
    <div className="my-10 w-full flex sm:flex-row justify-between flex-col">
      <div className="total-items flex items-center justify-center">
        Showing{" "}
        <span className="font-bold">
          &nbsp;
          {totalDocs !== 0
            ? (page - 1) * ITEMS_PER_PAGE + 1
            : (page - 1) * ITEMS_PER_PAGE}
          &nbsp;{" "}
        </span>{" "}
        to{" "}
        <span className="font-bold">
          &nbsp;
          {page * ITEMS_PER_PAGE > totalDocs
            ? totalDocs
            : page * ITEMS_PER_PAGE}
        </span>
        &nbsp;of&nbsp;<span className="font-bold">{totalDocs}</span>
        &nbsp;results
      </div>
      <div className="flex items-center justify-center">
        <button
          className={`h-10 w-10 mx-3 border-2 border-gray-400 text-xl ${
            page == 1 ? "cursor-not-allowed bg-[#dedede] " : "cursor-pointed"
          } `}
          disabled={page == 1}
          onClick={() => handlePageChange(page - 1)}
        >
          &lt;
        </button>
        {pageNumberArray
          .slice(
            Math.max(0, page - 3),
            Math.min(page + 2, pageNumberArray.length)
          )
          .map((pageNumber, index) => {
            return (
              <button
                key={index}
                className={`h-10 w-10 p-3 ${
                  page === pageNumber
                    ? "bg-[rgb(79,70,229)]"
                    : "bg-white border-2"
                } flex items-center justify-center`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        <button
          className={`h-10 w-10 mx-3 border-2 border-gray-400 text-xl ${
            page == pageNumberArray.length
              ? "cursor-not-allowed bg-[#dedede] "
              : "cursor-pointed"
          }`}
          disabled={page == pageNumberArray.length}
          onClick={() => handlePageChange(page + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

'use client'
import { CiSearch } from "react-icons/ci";
import { useAppDispatch , useAppSelector } from "../lib/hooks";
import { selectSearchInput, setSearchInput } from "../lib/store/features/filters/filtersSlice";

export default function SearchInput() {
    const dispatch = useAppDispatch()
    const searchInput = useAppSelector(selectSearchInput)
  function searchInputHandler(e) {
    dispatch(setSearchInput(e.target.value.trim()));
  }
  return (
    <div className="flex items-center justify-center mt-6 mb-2 mx-auto">
      <div className="wrapper min-w-[80vw] sm:min-w-[60vw] max-w-[400px] relative">
        <input
          type="text"
          className="px-4 py-1 outline-none border-2 border-gray-400 rounded-md w-full text-lg"
          placeholder="Search..."
          onChange={searchInputHandler}
          value={searchInput}
        />
        <CiSearch className="absolute right-5 top-[25%] text-gray-500 size-6" />
      </div>
    </div>
  );
}

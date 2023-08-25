import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ searchText, setSearchText }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute right-2 bottom-5 opacity-70" />
      <input className="focus:border border rounded-md w-full p-1" placeholder="masukan kata kunci" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    </div>
  );
};

export default SearchBox;

import StoreData from "./StoreData";
import { useState } from "react";

const StoreSection = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="search">Search: </label>
        <input type="text" id="search" onChange={handleSearch} />
      </div>
      <StoreData searchKeyword={searchKeyword} />
    </>
  );
};

export default StoreSection;

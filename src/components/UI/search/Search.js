import React, { useState } from "react";

import classes from "../../../styles/UI/Searchbar.module.css";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredStores = Object.values(props.stores).filter((store) =>
    query ? store.name.toLowerCase().includes(query.toLowerCase()) : false
  );

  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {filteredStores.map((store) => (
          <li key={store.id}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;

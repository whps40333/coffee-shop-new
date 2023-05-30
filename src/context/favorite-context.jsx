import React from "react";

const FavoriteContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearFavorite: () => {},
});

export default FavoriteContext;

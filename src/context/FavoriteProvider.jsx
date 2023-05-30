import { useReducer } from "react";
import FavoriteContext from "./favorite-context";
const defaultFavoriteState = {
  items: [],
};

const favoriteReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    return {
      items: updatedItems,
    };
  }
  return defaultFavoriteState;
};

const FavoriteProvider = (props) => {
  const [favoriteState, dispatchFavoriteAction] = useReducer(
    favoriteReducer,
    defaultFavoriteState
  );

  const addItemToFavoriteHandler = (item) => {
    dispatchFavoriteAction({ type: "ADD", item: item });
  };

  const removeItemToFavoriteHandler = (id) => {
    dispatchFavoriteAction({ type: "REMOVE", id: id });
  };

  const favoriteContext = {
    items: favoriteState.items,
    addItem: addItemToFavoriteHandler,
    removeItem: removeItemToFavoriteHandler,
  };
  return (
    <FavoriteContext.Provider value={favoriteContext}>
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;

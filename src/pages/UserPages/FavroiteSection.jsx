import classes from "../../styles/pages/UserPages/Favorites/FavoriteSection.module.css";
import { useCallback, useState, useEffect } from "react";

import FavoriteList from "./Favorites/FavoriteList";

function FavoriteSection(props) {
  const [favoriteItem, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavoriteHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://coffee-shop-new-default-rtdb.firebaseio.com/favoriteItem.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedRestaurants = [];
      for (const key in data) {
        loadedRestaurants.push({
          id: key,
          name: data[key].name,
          time: data[key].time,
          price: data[key].price,
          score: data[key].score,
        });
      }

      setFavoriteItems(loadedRestaurants);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const removeFavoriteHandler = (id) => {
    setFavoriteItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    fetchFavoriteHandler();
  }, [fetchFavoriteHandler]);

  let content = <p>Found no comments.</p>;

  if (favoriteItem.length > 0) {
    content = (
      <FavoriteList
        FavoriteItems={favoriteItem}
        onRemove={removeFavoriteHandler}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section className={classes.wrapper}>{content}</section>
    </>
  );
}

export default FavoriteSection;

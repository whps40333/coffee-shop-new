import StoreItem from "./StoreItem";
import classes from "../../styles/store/storeData.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../UI/search/Search";
import axios from "axios";

function StoreData(props) {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  // 搜尋關鍵字的狀態

  useEffect(() => {
    if (searchKeyword) {
      const filteredStores = stores.filter((store) =>
        store.name.includes(searchKeyword)
      );
      setFilteredStores(filteredStores);
    } else {
      setFilteredStores([]);
    }
  }, [searchKeyword, stores]);

  useEffect(() => {
    axios
      .get("https://coffee-shop-new-default-rtdb.firebaseio.com/stores.json")
      .then((response) => {
        const data = response.data;
        const loadedStores = [];
        for (const key in data) {
          loadedStores.push({
            id: key,
            name: data[key].name,
            time: data[key].time,
            price: data[key].price,
            score: data[key].score,
          });
        }
        setStores(loadedStores);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.StoresLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const storeList =
    searchKeyword && filteredStores.length === 0 ? (
      <p>No results found.</p>
    ) : (
      stores.map((store) => (
        <StoreItem
          key={store.id}
          id={store.id}
          name={store.name}
          time={store.time}
          price={store.price}
          score={store.score}
          onAddToFavorite={props.onAddtoFavorite}
        />
      ))
    );

  return (
    <>
      {" "}
      <SearchBar
        stores={stores}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <div className={classes.wrapper}>{storeList}</div>;
    </>
  );
}

export default StoreData;

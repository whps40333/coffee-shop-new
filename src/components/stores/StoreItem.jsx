import React from "react";
import Clrbutton from "../UI/Buttons/ClrButton";
import { useEffect, useState } from "react";
import classes from "../../styles/store/storeItem.module.css";
import Card from "../UI/Modals/Card";

const StoreItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // 檢查是否已經收藏
    fetch(
      "https://coffee-shop-new-default-rtdb.firebaseio.com/favoriteItem.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const favoriteItems = Object.values(data);
          const isFavorite = favoriteItems.some((item) => item.id === props.id);
          setIsFavorite(isFavorite);
          setIsDisabled(isFavorite);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  const addTofavoriteHandler = () => {
    if (!isFavorite) {
      const favoriteItem = {
        id: props.id,
        name: props.name,
        time: props.time,
        price: props.price,
        score: props.score,
      };

      fetch(
        "https://coffee-shop-new-default-rtdb.firebaseio.com/favoriteItem.json",
        {
          method: "POST",
          body: JSON.stringify(favoriteItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setIsFavorite(true);
          setIsDisabled(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("已经收藏過了！");
    }
  };

  return (
    <Card>
      <li className={classes.wrapper}>
        <div className={classes.storeItem}>
          <div className={classes.score}>{props.score}</div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.time}</div>
          <div className={classes.price}>{props.price}</div>
        </div>
        <Clrbutton
          className={isDisabled ? `${classes.disabled}` : null}
          disabled={isDisabled}
          onClick={addTofavoriteHandler}
        >
          {isFavorite ? "已收藏" : "收藏"}
        </Clrbutton>
      </li>
    </Card>
  );
};

export default StoreItem;

import React from "react";
import FavoriteItem from "./FavoriteItem";

function FavoriteList(props) {
  return (
    <>
      {props.FavoriteItems.map((item) => (
        <FavoriteItem
          key={item.id}
          id={item.id}
          name={item.name}
          time={item.time}
          price={item.price}
          score={item.score}
          onRemove={props.onRemove}
        />
      ))}
    </>
  );
}

export default FavoriteList;

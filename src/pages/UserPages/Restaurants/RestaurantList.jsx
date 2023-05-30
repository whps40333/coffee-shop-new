import React from "react";
import Restaurant from "./Restaurant";

function RestaurantList(props) {
  return (
    <ul>
      {props.restaurants.map((restaurant) => (
        <Restaurant
          key={restaurant.id}
          title={restaurant.title}
          visitDate={restaurant.visitDate}
          comment={restaurant.comment}
        />
      ))}
    </ul>
  );
}

export default RestaurantList;

import classes from "../../../styles/pages/UserPages/Favorites/FavoriteItem.module.css";

const FavoriteItem = (props) => {
  const removeFavoriteHandler = () => {
    const favoriteItemId = props.id;
    console.log(favoriteItemId);

    fetch(
      `https://coffee-shop-new-default-rtdb.firebaseio.com/favoriteItem/${favoriteItemId}.json`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        console.log("Deleted successfully");
        props.onRemove(favoriteItemId);
      })
      .catch((response) => console.error(response));
  };

  return (
    <div className={classes.favoriteItem}>
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.time}</div>
      <div className={classes.price}>{props.price}</div>
      <div className={classes.score}>{props.score}</div>
      <button className={classes.button} onClick={removeFavoriteHandler}>
        移除
      </button>
    </div>
  );
};

export default FavoriteItem;

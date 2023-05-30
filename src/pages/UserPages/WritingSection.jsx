import React, { useRef } from "react";
import classes from "../../styles/pages/UserPages/WritingSection.module.css";
import Clrbutton from "../../components/UI/Buttons/ClrButton";

function WritingSection(props) {
  const titleRef = useRef("");
  const visitDateRef = useRef("");
  const commentRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    const title = titleRef.current.value;
    const visitDate = visitDateRef.current.value;
    const comment = commentRef.current.value;

    if (comment.length > 150) {
      alert("回饋字數不能超過150字！");
      return;
    }

    const restaurant = {
      title: title,
      visitDate: visitDate,
      comment: comment,
    };

    fetch(
      "https://coffee-shop-new-default-rtdb.firebaseio.com/restaurants.json",
      {
        method: "POST",
        body: JSON.stringify(restaurant),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <form onSubmit={submitHandler} className={classes.wrapper}>
      <div className={classes.control}>
        <label htmlFor="title"></label>
        <input type="text" id="title" ref={titleRef} placeholder="餐廳名稱" />
      </div>
      <div className={classes.control}>
        <label htmlFor="Date"></label>
        <input
          type="date"
          min="2019-01-01"
          max="2023-12-31"
          id="date"
          ref={visitDateRef}
          placeholder="2022-02-27"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="comment"></label>
        <textarea
          type="text"
          id="comment"
          ref={commentRef}
          placeholder="用餐回饋"
        ></textarea>
      </div>
      <Clrbutton className={classes.clrbutton} type="submit">
        提交
      </Clrbutton>
    </form>
  );
}

export default WritingSection;

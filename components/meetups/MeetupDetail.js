import React from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetails = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.img} alt={props.desc} />
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <address>{props.address}</address>
    </section>
  );
};

export default MeetupDetails;

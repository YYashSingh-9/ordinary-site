import classes from "./LiCard.module.css";

// THIS IS A WRAPPER COMPONENT.
const LiCard = (props) => {
  return (
    <>
      <div className={classes.LiCard}>{props.children}</div>
    </>
  );
};

export default LiCard;

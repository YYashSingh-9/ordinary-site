import classes from "./LiCard.module.css";

const LiCard = (props) => {
  return (
    <>
      <div className={classes.LiCard}>{props.children}</div>
    </>
  );
};

export default LiCard;

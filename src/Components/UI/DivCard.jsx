import { NavLink } from "react-router-dom";
import classes from "./DivCard.module.css";

const DivCard = (props) => {
  return (
    <>
      <section className={classes.card}>
        <div className={classes.buttons}>
          <h2 className={classes.title}>{props.title}</h2>
          <NavLink to={`/${props.title}`}>
            <h3>Show More</h3>
          </NavLink>
        </div>
        <div className={classes.childCard}>{props.children}</div>
      </section>
    </>
  );
};

export default DivCard;

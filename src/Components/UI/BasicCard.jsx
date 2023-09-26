import { NavLink } from "react-router-dom";
import classes from "./BasicCard.module.css";

// THIS IS USED IN MAIN PAGE AS A WRAPPER - ONLY VALUES CHANGED (EX OF USAGE - BLOGS DIV IN MAIN PAGE)
const BasicCard = (props) => {
  return (
    <>
      <section className={classes.BasicCard}>
        <div className={classes.childOne}>
          <h2>{props.heading}</h2>
          {props.link ? (
            <NavLink to={`/${props.link}`}>
              <h3>{props.linkTitle}</h3>
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className={classes.childTwo}>{props.children}</div>
      </section>
    </>
  );
};

export default BasicCard;

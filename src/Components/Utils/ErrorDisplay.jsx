import { NavLink } from "react-router-dom";
import { BiSolidErrorCircle } from "react-icons/bi";
import classes from "./ErrorDisplay.module.css";

const ErrorDisplay = (props) => {
  return (
    <>
      <section className={classes.mainError}>
        <div className={classes.centerInfo}>
          <div className={classes.titleDiv}>
            <BiSolidErrorCircle className={classes.error_icon} />
            <h3 className={classes.titleh3}>
              {props.title
                ? props.title
                : "Oops Something went wrong!!. Click below. "}
            </h3>
          </div>
          <button className={classes.errorBtn}>
            <NavLink to="/">Click Here</NavLink>
          </button>
        </div>
      </section>
    </>
  );
};

export default ErrorDisplay;

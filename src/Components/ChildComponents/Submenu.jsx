// import { NavLink } from "react-router-dom";
import classes from "./Submenu.module.css";
import { NavLink } from "react-router-dom";
const Submenu = (props) => {
  return (
    <>
      <ul className={classes.subul}>
        {props.submen.map((el, index) => {
          return (
            <li key={index}>
              <NavLink to={el.url}>
                <h3>{el.title}</h3>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Submenu;

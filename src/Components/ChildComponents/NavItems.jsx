// import { NavLink } from "react-router-dom";
import Submenu from "./Submenu";
import classes from "./NavItem.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const NavItem = (props) => {
  const dispatch = useDispatch();
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const { id } = useParams();
  const { key, title, url, submenu } = props.elems;
  let links = url;

  // MANUAL TYPE WAY OF TOGGLING THE DROPDOWN FROM NAVBAR (NOT VERY OPTIMIZED OR DRY CODE)
  // (can be improved .. better and not complicated way is to create a dropdown with css)
  //(or use css library/framework like MUI,Tailwind CSS,Bootstrap👍)
  const catalogueToggle = () => {
    if (key === 1) {
      dispatch(actions.CatalogueToggler());
    } else if (key >= 2) {
      props.togglefnc();

      dispatch(actions.CatalogueToggler("removeSubMenu"));
    }
  };
  links === "catalogue" ? (links = id) : links;
  return (
    <>
      <li key={props.keys} className={classes.lis} onClick={catalogueToggle}>
        {
          <h3>
            {title === "Catalogue" ? (
              "Catalogue"
            ) : (
              <NavLink to={links}>{title}</NavLink>
            )}
          </h3>
        }
        {catalogueState && submenu && <Submenu submen={submenu} />}
        {/* <Submenu submen={props.elems.submenu} /> */}
      </li>
    </>
  );
};

export default NavItem;

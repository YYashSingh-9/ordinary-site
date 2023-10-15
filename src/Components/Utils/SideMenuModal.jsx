import classes from "./SideMenuModal.module.css";
import NavItem from "../ChildComponents/NavItems";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { actions } from "../../Store/StoreSlice";
import { NavLink } from "react-router-dom";
const Backdrop = (props) => {
  const removeFunction = () => {
    props.menuRemover();
  };
  return (
    <>
      <div className={classes.Backdrop} onClick={removeFunction}></div>
    </>
  );
};
const MenuItemPart = (props) => {
  const navData = props.navItems;
  const additionalClass = props.menuState ? classes.menuInCenter : "";
  const menutoggler = () => {
    props.menutoggle();
  };
  return (
    <>
      <div>
        <ul className={`${classes.unorderdList} ${additionalClass}`}>
          {navData.map((el, index) => {
            return (
              <NavItem
                elems={el}
                key={index}
                keys={index}
                togglefnc={menutoggler}
              />
            );
          })}
          <li>
            <NavLink to="/account-details">
              <h2 className={classes.acc} onClick={menutoggler}>
                Account
              </h2>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

const portalPlace = document.getElementById("backdrop");
const SideMenu = () => {
  const navData = useSelector((state) => state.sliceOne.navItems);
  const sideMenu = useSelector((state) => state.sliceOne.sideMenuState);
  const dispatch = useDispatch();
  const sideMenuToggler = () => {
    dispatch(actions.sideMenuToggle());
  };
  return (
    <>
      {createPortal(<Backdrop menuRemover={sideMenuToggler} />, portalPlace)}
      {createPortal(
        <MenuItemPart
          navItems={navData}
          menuState={sideMenu}
          menutoggle={sideMenuToggler}
        />,
        portalPlace
      )}
    </>
  );
};

export default SideMenu;

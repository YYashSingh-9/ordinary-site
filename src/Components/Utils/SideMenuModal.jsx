import classes from "./SideMenuModal.module.css";
import NavItem from "../ChildComponents/NavItems";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
const Backdrop = () => {
  return (
    <>
      <div className={classes.Backdrop}></div>
    </>
  );
};
const MenuItemPart = (props) => {
  const navData = props.navItems;
  return (
    <>
      <div>
        <ul className={classes.unorderdList}>
          {navData.map((el, index) => {
            return <NavItem elems={el} key={index} keys={index} />;
          })}
        </ul>
      </div>
    </>
  );
};

const portalPlace = document.getElementById("backdrop");
const SideMenu = () => {
  const navData = useSelector((state) => state.sliceOne.navItems);
  return (
    <>
      {createPortal(<Backdrop />, portalPlace)}
      {createPortal(<MenuItemPart navItems={navData} />, portalPlace)}
    </>
  );
};

export default SideMenu;

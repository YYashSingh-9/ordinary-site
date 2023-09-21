import classes from "./MainHeader.module.css";
import NavItem from "../ChildComponents/NavItems";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { BiRadioCircle } from "react-icons/bi";
import logo from "../../assets/logo2.png";
import { NavLink } from "react-router-dom";
import { actions } from "../../Store/StoreSlice";

const MainHeader = () => {
  const navData = useSelector((state) => state.sliceOne.navItems);
  const CartData = useSelector((state) => state.sliceOne.AddToCart_Array);
  const dispatch = useDispatch();
  const clickFunction = () => {
    dispatch(actions.searchModalToggler());
  };
  return (
    <>
      <header className={classes.head}>
        <nav>
          <div className={classes.logo}>
            <NavLink to={".."}>
              <img src={logo} />
            </NavLink>
          </div>
          <ul className={classes.unorderdList}>
            {navData.map((el, index) => {
              return <NavItem elems={el} key={index} keys={index} />;
            })}
          </ul>
          <div className={classes.navIcons}>
            <NavLink to={"/favourites"}>
              <CiHeart className={classes.icons} />
            </NavLink>
            <NavLink to={"/search"}>
              <CiSearch className={classes.icons} onClick={clickFunction} />
            </NavLink>
            <span>
              <NavLink to={"/cart"}>
                <CiShoppingCart className={classes.icons} />
              </NavLink>
              {CartData.length > 0 ? (
                <span className={classes.cartIndicator}>
                  <BiRadioCircle />
                </span>
              ) : (
                <span
                  className={`${classes.cartIndicator} ${classes.displayOff}`}
                >
                  <BiRadioCircle />
                </span>
              )}
            </span>
          </div>
        </nav>
      </header>
      {/* <Outlet /> */}
    </>
  );
};
export default MainHeader;

import classes from "./MainHeader.module.css";
import NavItem from "../ChildComponents/NavItems";
import SideMenu from "../Utils/SideMenuModal";
import logo from "../../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { BiRadioCircle, BiSolidUser, BiMenu } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { actions } from "../../Store/StoreSlice";
import { useRef } from "react";

const MainHeader = () => {
  const navData = useSelector((state) => state.sliceOne.navItems);
  const CartData = useSelector((state) => state.sliceOne.AddToCart_Array);
  const favState = useSelector((state) => state.sliceOne.isThereAFav);
  const searchbarValue = useSelector((state) => state.sliceOne.searchBarVal);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const sideMenuState = useSelector((state) => state.sliceOne.sideMenuState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputref = useRef();

  // Conditional style for red heart when item is added in fav item list..
  const favStyle = favState ? classes.favOn : " ";
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };
  // Search bar functionality.._________
  const navigateOnSearchHandler = (e) => {
    //Taking value
    const value = inputref.current.value;
    //When 'Enter' is pressed ..
    if (e.key === "Enter" && value.length >= 4) {
      dispatch(actions.searchFieldClear(true));
      navigate(`/${value}`);
    }
    //When 'Mouse click' is done..
    if (
      e.nativeEvent.pointerType === "mouse" &&
      e.nativeEvent.type === "click" &&
      value.length >= 4
    ) {
      dispatch(actions.searchFieldClear(true));
      navigate(`/${value}`);
    }
    //if above 2 conditions are not met then return and not execute the function
    return;
  };
  const onChangeSearch = () => {
    const value = inputref.current.value;
    dispatch(actions.searchBarTyper(value));
  };
  //_____________________________________________
  const sideMenuToggler = () => {
    dispatch(actions.sideMenuToggle());
  };
  return (
    <>
      <header className={classes.head} onClick={submenuRemover}>
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
            <div className={classes.searchBar}>
              <input
                type="search"
                ref={inputref}
                value={searchbarValue}
                onChange={onChangeSearch}
                onKeyDown={navigateOnSearchHandler}
              />
              <div>
                <CiSearch
                  className={classes.searchIcon}
                  onClick={navigateOnSearchHandler}
                />
              </div>
            </div>
            <NavLink to={"/account-details"}>
              <BiSolidUser className={`${classes.icons} ${classes.disp}`} />
            </NavLink>
            <NavLink to={"/favourites"}>
              <CiHeart className={`${classes.icons} ${favStyle}`} />
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
            <BiMenu className={classes.menuIcon} onClick={sideMenuToggler} />
          </div>
        </nav>
        {sideMenuState && <SideMenu />}
      </header>
    </>
  );
};
export default MainHeader;

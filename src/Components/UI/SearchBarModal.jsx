import classes from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";

const BackDrop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ModalExit = () => {
    dispatch(actions.searchModalToggler());
    navigate("../");
  };
  return (
    <>
      <div className={classes.BackDrop} onClick={ModalExit}>
        <h2 className={classes.backdropWritten}>
          Search - 'hair / skincare / bestsellers'
        </h2>
      </div>
    </>
  );
};
const SearchDiv = () => {
  const inputref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickFunction = () => {
    const refValue = inputref.current.value;
    console.log(refValue);
    dispatch(actions.searchModalToggler());
    navigate(`/${refValue}`);
  };

  return (
    <>
      <div className={classes.searchDiv}>
        <input type="search" className={classes.searchBar} ref={inputref} />
        <CiSearch className={classes.icon} onClick={clickFunction} />
      </div>
    </>
  );
};

const portal = document.getElementById("backdrop");
const SearcBarModal = () => {
  const searchModalState = useSelector((state) => state.sliceOne.searchModal);
  console.log(searchModalState);
  return (
    <>
      {searchModalState && createPortal(<BackDrop />, portal)}
      {searchModalState && createPortal(<SearchDiv />, portal)}
      <Outlet />
    </>
  );
};

export default SearcBarModal;

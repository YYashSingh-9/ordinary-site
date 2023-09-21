import classes from "./HeaderMiddle.module.css";
import HeaderImage from "../../assets/wall5.png";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const HeaderMiddle = () => {
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const dispatch = useDispatch();
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };
  return (
    <>
      <section className={classes.middleHeader} onClick={submenuRemover}>
        <div className={classes.imgDiv}>
          <img src={HeaderImage} />
        </div>
      </section>
    </>
  );
};
export default HeaderMiddle;

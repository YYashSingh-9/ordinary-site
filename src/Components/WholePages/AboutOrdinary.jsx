import classes from "./AboutOrdinary.module.css";
import aboutImage from "../../assets/blog2.jpg";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const AboutOrdinary = () => {
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
      <section className={classes.MainAboutSecDiv} onClick={submenuRemover}>
        <div className={classes.imageHere}>
          <img src={aboutImage} />
        </div>
        <div className={classes.textHere}>
          <h2>About Page</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. <br /> It was popularised in the
            1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem IpsumIt is a long
            established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English. <br /> It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem IpsumIt is a long established
            fact that a reader will be distracted by the readable content of a
            page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as
            opposed to using 'Content here, content here', making it look like
            readable English.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutOrdinary;

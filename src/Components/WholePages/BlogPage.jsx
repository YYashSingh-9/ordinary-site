import classes from "./BlogPage.module.css";
import blogImage from "../../assets/teto.jpg";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const BlogComponent = (props) => {
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
      <div className={classes.blogBar} onClick={submenuRemover}>
        <div className={classes.barImage}>
          <img src={blogImage} />
        </div>
        <div className={classes.barInfos}>
          <h2>THIS IS BLOG {props.title}</h2>
          <p>{`comments(5)`}</p>
        </div>
        <div className={classes.icons}>
          {/* <BsArrowBarRight /> */}
          <AiOutlineArrowRight />
        </div>
      </div>
    </>
  );
};

const BlogPage = () => {
  return (
    <>
      <section className={classes.MainAboutSecDiv}>
        <BlogComponent title={1} />
        <BlogComponent title={2} />
      </section>
    </>
  );
};

export default BlogPage;

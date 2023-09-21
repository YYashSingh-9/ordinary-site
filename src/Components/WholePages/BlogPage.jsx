import classes from "./BlogPage.module.css";
import blogImage from "../../assets/teto.jpg";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";

const BlogComponent = (props) => {
  return (
    <>
      <div className={classes.blogBar}>
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

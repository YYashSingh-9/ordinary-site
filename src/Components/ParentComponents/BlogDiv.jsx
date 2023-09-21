import classes from "./BlogDiv.module.css";
import BasicCard from "../UI/BasicCard";
import image1 from "../../assets/blog1.jpg";
import image2 from "../../assets/blog2.jpg";

const CardOfBlog = (props) => {
  return (
    <>
      <div className={classes.parentDiv}>
        <div className={classes.imageUsed}>
          <img src={props.img} />
        </div>
        <span className={classes.interationInfo}>
          <p>{props.datePassed}</p>
          <p>{`COMMENTS (${5})`}</p>
        </span>
        <div className={classes.title_N_info}>
          <h2>{props.title}</h2>
          <p>{props.caption}</p>
        </div>
      </div>
    </>
  );
};

const BlogDiv = () => {
  return (
    <>
      <BasicCard heading="BLOG" linkTitle="READ MORE" link="blog">
        <CardOfBlog
          datePassed="20 feb 2023"
          title="Stories of Clients"
          caption="There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some"
          img={image1}
        />
        <CardOfBlog
          datePassed="30 feb 2023"
          title="Step by Step"
          caption="There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some"
          img={image2}
        />
      </BasicCard>
    </>
  );
};
export default BlogDiv;

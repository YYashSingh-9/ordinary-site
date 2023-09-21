import classes from "./AboutDiv.module.css";
import BasicCard from "../UI/BasicCard";
import img1 from "../../assets/products/serumSeven.png";
import img2 from "../../assets/products/serumSix.png";
import img3 from "../../assets/products/serumTen.png";

const AboutDiv = () => {
  return (
    <>
      <BasicCard
        heading="ABOUT TWO FRAGRENCE"
        linkTitle="READ MORE"
        link="about"
      >
        <div className={classes.ImageDiv}>
          <img src={img1} />
        </div>
        <div className={classes.OtherPart}>
          <div className={classes.imgHere}>
            <img src={img2} />
            <img src={img3} />
          </div>
          {/* ____ */}
          <div className={classes.texts}>
            <h2>Learn More about our company and our values.</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some.
            </p>
          </div>
        </div>
      </BasicCard>
    </>
  );
};
export default AboutDiv;

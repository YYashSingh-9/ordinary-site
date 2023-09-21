import { BsArrowUpRight } from "react-icons/bs";
import classes from "./Catalogues.module.css";
import image from "../../assets/products/serumTwelve.png";
import BasicCard from "../UI/BasicCard";

const CataloguesDiv = () => {
  return (
    <>
      <BasicCard heading="CATALOGUE">
        <div>
          <div className={classes.sideImg}>
            <img src={image} />
            {/* <p>dd</p> */}
          </div>
        </div>
        <div className={classes.sideInfo}>
          <div className={classes.infos}>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
          </div>
          <div className={classes.links}>
            <hr />
            <div className={classes.spans}>
              <p>HAIR</p>
              <BsArrowUpRight className={classes.linklogo} />
            </div>
            <hr />
            <div className={classes.spans}>
              <p>SERUM</p>
              <BsArrowUpRight className={classes.linklogo} />
            </div>
            <hr />
            <div className={classes.spans}>
              <p>PERFUME</p>
              <BsArrowUpRight className={classes.linklogo} />
            </div>
            <hr />
            <div className={classes.spans}>
              <p>CREME</p>
              <BsArrowUpRight className={classes.linklogo} />
            </div>
            <hr />
          </div>
        </div>
      </BasicCard>
    </>
  );
};

export default CataloguesDiv;

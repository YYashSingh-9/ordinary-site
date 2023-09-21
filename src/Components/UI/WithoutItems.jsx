import classes from "./WithoutItems.module.css";
import bagImg from "../../assets/bag.png";
import { NavLink } from "react-router-dom";

const WithoutItems = (props) => {
  return (
    <>
      <section className={classes.ParentDiv}>
        <div className={classes.CenterDiv}>
          <div className={classes.ImgDiv}>
            <img src={bagImg} />
          </div>
          <div className={classes.writtens}>
            <h2>{props.title}</h2>
            <p>{props.subTitle}</p>
          </div>
          <div className={classes.buttonHere}>
            <button>
              <NavLink to={props.link}>{props.btnText}</NavLink>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithoutItems;

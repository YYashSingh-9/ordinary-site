import classes from "./ProductInfoPage.module.css";
import image from "../../assets/blog1.jpg";
import logo from "../../assets/logo2.png";
import { BsStarFill, BsStar, BsStarHalf, BsHeart } from "react-icons/bs";
import PlusMinusButton from "../ChildComponents/PlusMinusButton";
//THIS IS THE RATINGS DISPLAYED
const StarComponent = ({ starPassed }) => {
  const RatingStars = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;

    return (
      <span key={index} className={classes.stars}>
        {starPassed >= index + 1 ? (
          <BsStarFill />
        ) : starPassed >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return <div>{RatingStars}</div>;
};

const ProductInfoPage = () => {
  return (
    <>
      <section className={classes.mainProductDiv}>
        <div>Home /products / hair Creme</div>
        <div className={classes.mainDiv}>
          <div className={classes.productImg}>
            <div className={classes.imgContainer}>
              <img src={image} />
            </div>
          </div>
          <div className={classes.productDetails}>
            <div className={classes.heading}>
              <div className={classes.insideLogo}>
                <img src={logo} />
              </div>
              <div>
                <BsHeart className={`${classes.heartLogo} ${classes.red}`} />
              </div>
            </div>
            <div className={classes.details}>
              <div>
                <h2>HAIR CREME BY THE ORDINARY</h2>
              </div>
              <div>
                <StarComponent starPassed={4.5} />
              </div>
              <div>
                <div className={classes.prices}>
                  <h3 className={classes.discPrice}>$7.89</h3>
                  <h3>$ 4</h3>
                </div>
                <h4>Discount of 25%</h4>
              </div>
              <div className={classes.actionBtns}>
                <PlusMinusButton />
                <button className={classes.btn}>Add To Basket</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductInfoPage;

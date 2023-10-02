import classes from "./ProductItem.module.css";
import LiCard from "../UI/LiCard";
import { BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { NavLink } from "react-router-dom";

// THIS IS THE PRODUCT CARDS(PRODUCTS) SEEN EVERYWHERE ..
const ProductItem = (props) => {
  const { title, price, images, key, isFav, catagory } = props.elem;
  const dispatch = useDispatch();

  const favouriteOnClick = () => {
    dispatch(actions.FavouriteToggler(key));
  };
  //This is done to disable clicking the heart again after it is pushed to fav list by user
  const DisableValue = !isFav ? false : true;

  return (
    <>
      <LiCard>
        <div className={classes.imgDiv}>
          <img src={require(`../../assets/products/${images}`).default} />
          <button
            className={classes.heartBtn}
            disabled={DisableValue}
            onClick={favouriteOnClick}
          >
            <BsHeart className={classes.heartLogo} />
          </button>
        </div>
        <div className={classes.productInfo}>
          <h2>
            <NavLink to={`/${catagory}/${title}`}>{title}</NavLink>
          </h2>
          <h3>${price}</h3>
          {props.btnState && <button className={classes.addBtn}>Add</button>}
        </div>
      </LiCard>
    </>
  );
};

export default ProductItem;

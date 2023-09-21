import classes from "./ProductItem.module.css";
import LiCard from "../UI/LiCard";
import { BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const ProductItem = (props) => {
  const { title, price, images, key, isFav } = props.elem;
  const dispatch = useDispatch();

  const favouriteOnClick = () => {
    dispatch(actions.FavouriteToggler(key));
  };
  const DisableValue = !isFav ? false : true;

  return (
    <>
      <LiCard>
        <div className={classes.imgDiv}>
          <img src={images} />
          <button
            className={classes.heartBtn}
            disabled={DisableValue}
            onClick={favouriteOnClick}
          >
            <BsHeart className={classes.heartLogo} />
          </button>
        </div>
        <div className={classes.productInfo}>
          <h2>{title}</h2>
          <h4>${price}</h4>
        </div>
      </LiCard>
    </>
  );
};

export default ProductItem;

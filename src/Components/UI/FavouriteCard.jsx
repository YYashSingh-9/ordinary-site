import classes from "./FavouriteCard.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
const FavouriteCard = (props) => {
  const { title, price, images, key, isFav } = props.elem;
  console.log(props.elem);
  const extendedPrice = (price * 3).toFixed(2);
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(actions.FavouriteToggler(key)); // this changes isFav=true to false which removes this item from favCart when re-evaluates
    dispatch(actions.AddItemToCart(props.elem));
  };
  const removeFavStatus = () => {
    dispatch(actions.FavouriteToggler(key));
  };
  return (
    <>
      <div className={classes.favCardParentDiv}>
        <div className={classes.imgAndCloseDiv}>
          <div className={classes.favImg}>
            <img src={images} />
          </div>
          <button className={classes.closeBtn}>
            <AiOutlineCloseCircle
              className={classes.closeLogo}
              onClick={removeFavStatus}
            />
          </button>
        </div>
        <div className={classes.productInfos}>
          <div className={classes.title}>
            <h3>{title}</h3>
          </div>
          <div className={classes.prices}>
            <span>
              <h4>{`$ ${price}`}</h4>
            </span>
            <span>
              <h4 className={classes.cuttedPrice}>{`$ ${extendedPrice}`}</h4>
            </span>
            <span>
              <h4 className={classes.offerPrice}>{`(60% OFF)`}</h4>
            </span>
          </div>
        </div>
        <div className={classes.addedBtn}>
          <button className={classes.addBtn} onClick={addItemToCartHandler}>
            Add to bag
          </button>
        </div>
      </div>
    </>
  );
};

export default FavouriteCard;

import classes from "./FavouriteCard.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useMutation } from "@tanstack/react-query";
import { postFav } from "../../Store/ActionCreatorThunk";

const FavouriteCard = (props) => {
  const { title, price, images, key, isFav, catagory, _id } = props.elem;
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const extendedPrice = (price * 3).toFixed(2);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationKey: ["fav-state", key],
    mutationFn: (condition) => {
      return postFav(props.elem, cookie, currentUser._id, condition);
    },
  });
  const addItemToCartHandler = () => {
    dispatch(actions.FavouriteToggler(key)); // this changes isFav=true to false which removes this item from favCart when re-evaluates
    dispatch(actions.AddItemToCart(props.elem));
  };

  // WHEN CLICKED ON TOP-RIGHT CROSS -:>THIS FUNCTION RUNS
  const removeFavStatus = () => {
    dispatch(actions.FavouriteToggler(key));
    if (isFav) {
      console.log("deleted fav");
      mutate("deleteFav");
    }
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

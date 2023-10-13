import classes from "./FavouriteCard.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useMutation } from "@tanstack/react-query";
import { postFav } from "../../Store/ActionCreatorThunk";
import { queryClient } from "../../Store/ActionCreatorThunk";

// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = (type) => {
  if (type === "removeFav") {
    return toast.error("Product removed.🙁", {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
    });
  } else if (type === "addToCart") {
    return toast.success("Product added to cart.👍", {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
    });
  }
};

const FavouriteCard = (props) => {
  const { title, price, images, key, isFav, catagory, _id } = props.elem;
  console.log(props.elem);
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const extendedPrice = (price * 3).toFixed(2);
  const dispatch = useDispatch();

  //SENDING FAV REQUEST & SENDING DATA TO CART
  const { mutate } = useMutation({
    mutationKey: ["fav-state", key],
    mutationFn: (condition) => {
      return postFav(props.elem, cookie, currentUser._id, condition);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProd"] });
    },
  });

  const addItemToCartHandler = () => {
    dispatch(actions.FavouriteToggler(key)); // this changes isFav=true to false which removes this item from favCart when re-evaluates
    dispatch(actions.AddItemToCart(props.elem));
    mutate("deleteFav");
    mutate("add-to-cart");
    notifyFn("addToCart");
  };

  // WHEN CLICKED ON TOP-RIGHT CROSS -:>THIS FUNCTION RUNS
  const removeFavStatus = () => {
    dispatch(actions.FavouriteToggler(key));
    if (isFav) {
      console.log("deleted fav");
      mutate("deleteFav");
      notifyFn("removeFav");
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
        <ToastContainer />
      </div>
    </>
  );
};

export default FavouriteCard;

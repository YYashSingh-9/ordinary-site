import classes from "./ProductItem.module.css";
import LiCard from "../UI/LiCard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postFav, queryClient } from "../../Store/ActionCreatorThunk";

// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = () => {
  return toast;
};

// THIS IS THE PRODUCT CARD(PRODUCTS) SEEN EVERYWHERE ..
const ProductItem = (props) => {
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const dispatch = useDispatch();
  const { title, price, images, key, isFav, catagory, _id } = props.elem;
  const { mutate } = useMutation({
    mutationKey: ["fav-state-post", key],
    mutationFn: (condition) => {
      return postFav(props.elem, cookie, currentUser._id, condition);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favProd"] });
    },
  });

  const favouriteOnClick = (e) => {
    if (!isFav) {
      console.log("posted fav");
      mutate("postFav");
    }
    dispatch(actions.FavouriteToggler(key));
  };

  //This is done to disable clicking the heart again after it is pushed to fav list by user
  const DisableValue = !isFav ? false : true;
  return (
    <>
      <LiCard key={key}>
        <div className={classes.imgDiv}>
          <img src={images} />
          <button
            type="submit"
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
      <ToastContainer />
    </>
  );
};

export default ProductItem;

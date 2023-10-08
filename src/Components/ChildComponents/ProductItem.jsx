import classes from "./ProductItem.module.css";
import LiCard from "../UI/LiCard";
import { BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { favToggler } from "../../Store/ActionCreatorThunk";

// THIS IS THE PRODUCT CARD(PRODUCTS) SEEN EVERYWHERE ..
const ProductItem = (props) => {
  const { title, price, images, key, isFav, catagory, _id } = props.elem;
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationKey: ["fav-state", key],
    mutationFn: () => {
      return favToggler(isFav, _id);
    },
  });

  const favouriteOnClick = (e) => {
    dispatch(actions.FavouriteToggler(key));
    mutate();
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
    </>
  );
};

export default ProductItem;

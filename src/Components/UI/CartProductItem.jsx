import classes from "./CartProductItem.module.css";
import { actions } from "../../Store/StoreSlice";
import { useDispatch } from "react-redux";
import PlusMinusButton from "../ChildComponents/PlusMinusButton";
import { BsX } from "react-icons/bs";

// PRODUCT WHICH SHOWS ON CART PAGE...
const CartProductItem = (props) => {
  const { title, price, images, catagory, quantity, key } = props.elem;
  const isCartOn = props.isCartOn;
  const dispatch = useDispatch();
  const elem = props.elem;
  const addItemHandler = () => {
    dispatch(actions.AddItemToCart(elem));
  };
  const removeItemFromCart_Handler = () => {
    dispatch(actions.totalRemoveFromCart(elem));
  };
  return (
    <>
      <div className={classes.cartItem}>
        <div className={classes.cartImg} onClick={addItemHandler}>
          <img src={images} />
        </div>
        <div className={classes.details}>
          <div className={classes.titleNprice}>
            <div>
              <h3>{title}</h3>
              <h4>{price}</h4>
            </div>
            <span className={classes.cross}>
              <BsX onClick={removeItemFromCart_Handler} />
            </span>
          </div>
          <PlusMinusButton
            addItemFunction={addItemHandler}
            cartisOn={isCartOn}
            elems={elem}
          />
        </div>
      </div>
    </>
  );
};
export default CartProductItem;

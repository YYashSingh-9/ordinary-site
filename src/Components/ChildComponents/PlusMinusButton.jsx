import classes from "./PlusMinusButton.module.css";
import { useState } from "react";
import { actions } from "../../Store/StoreSlice";
import { useDispatch } from "react-redux";

// THIS COMPONENT CAN BE SEEN IN PRODUCT SHOWN IN CART PAGE WHEN ADDED TO CART(BAG)
// MADE THIS WAY BECAUSE IT WAS USED TWICE THRICE SO -> D.R.Y
const PlusMinusButton = (props) => {
  const [quantityState, setQuantity] = useState(props.elems.quantity);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    // dispatch(actions.AddItemToCart(props.elems));
    props.addItemFunction();
    setQuantity((state) => {
      return state + 1;
    });
  };

  const decrementHandler = () => {
    dispatch(actions.RemoveItemfromCart(props.elems));
    quantityState > 0
      ? setQuantity((state) => {
          return state - 1;
        })
      : setQuantity(0);
  };
  return (
    <>
      <div className={classes.main_btns}>
        {!props.cartisOn && (
          <div className={classes.quantityBtn}>
            <button onClick={decrementHandler}>-</button>
            <p>{quantityState}</p>
            <button onClick={incrementHandler}>+</button>
          </div>
        )}

        {props.cartisOn && (
          <div>
            <button className={classes.addBtn} onClick={onclick}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PlusMinusButton;

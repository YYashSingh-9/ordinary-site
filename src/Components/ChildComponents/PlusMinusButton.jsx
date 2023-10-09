import classes from "./PlusMinusButton.module.css";
import { useState } from "react";

// THIS COMPONENT CAN BE SEEN IN PRODUCT SHOWN IN CART PAGE WHEN ADDED TO CART(BAG)
// MADE THIS WAY BECAUSE IT WAS USED TWICE THRICE SO -> D.R.Y
const PlusMinusButton = (props) => {
  const [quantityState, setQuantity] = useState(props.elems.quantity);

  const incrementHandler = () => {
    props.addItemFunction();
    setQuantity((state) => {
      return state + 1;
    });
  };

  const decrementHandler = () => {
    props.deductItemFnc();
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

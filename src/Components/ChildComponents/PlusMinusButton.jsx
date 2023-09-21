import classes from "./PlusMinusButton.module.css";
import { useState } from "react";

const PlusMinusButton = (props) => {
  const [quantityState, setQuantity] = useState(1);

  const onclick = () => {
    props.addItemFunction(quantityState);
  };

  const incrementHandler = () => {
    setQuantity((state) => {
      return state + 1;
    });
  };

  const decrementHandler = () => {
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

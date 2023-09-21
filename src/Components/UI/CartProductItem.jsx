import classes from "./CartProductItem.module.css";
import { actions } from "../../Store/StoreSlice";
import { useDispatch } from "react-redux";
import PlusMinusButton from "../ChildComponents/PlusMinusButton";
import { BsX } from "react-icons/bs";

//  key: newItem.key,
//           title: newItem.title,
//           price: newItem.price,
//           images: newItem.images,
//           isFav: newItem.isFav,
//           catagory: newItem.catagory,
//           quantity: newItem.quantity,

const CartProductItem = (props) => {
  const { title, price, images, catagory, quantity, key } = props.elem;
  const isCartOn = props.isCartOn;
  const dispatch = useDispatch();

  const addItemHandler = (quantityRecieved) => {
    const ProductToBeAdded = { ...props.elem, quantity: quantityRecieved };
    dispatch(actions.AddItemToCart(ProductToBeAdded));
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
              <BsX />
            </span>
          </div>
          <PlusMinusButton
            addItemFunction={addItemHandler}
            cartisOn={isCartOn}
          />
        </div>
      </div>
    </>
  );
};
export default CartProductItem;

import classes from "./CartProductItem.module.css";
import { actions } from "../../Store/StoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { cartProductPATCH } from "../../Store/ActionCreatorThunk";
import PlusMinusButton from "../ChildComponents/PlusMinusButton";
import { BsX } from "react-icons/bs";

// PRODUCT WHICH SHOWS ON CART PAGE...
const CartProductItem = (props) => {
  const productToBePatched = useSelector(
    (state) => state.sliceOne.cartProductToBePatched
  );
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const { title, price, images, catagory, quantity, key, _id } = props.elem;
  const isCartOn = props.isCartOn;
  const dispatch = useDispatch();
  const elem = props.elem;

  const { mutate, data } = useMutation({
    mutationKey: ["cartPatch"],
    mutationFn: async (patchtype) => {
      return cartProductPATCH(productToBePatched, cookie, patchtype);
    },
  });

  const addItemHandler = () => {
    dispatch(actions.AddItemToCart(elem));
    dispatch(actions.cartProduct_Patch(_id));
    mutate("normal_patch");
  };
  const item_deduct_fnc = () => {
    dispatch(actions.RemoveItemfromCart(elem));
    dispatch(actions.cartProduct_Patch(_id));
    mutate("normal_patch");
  };
  const removeItemFromCart_Handler = () => {
    dispatch(actions.totalRemoveFromCart(elem));
    mutate({ type: "delete_patch", id: elem._id });
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
              <h4>${price}</h4>
            </div>
            <span className={classes.cross}>
              <BsX onClick={removeItemFromCart_Handler} />
            </span>
          </div>
          <PlusMinusButton
            addItemFunction={addItemHandler}
            cartisOn={isCartOn}
            elems={elem}
            deductItemFnc={item_deduct_fnc}
          />
        </div>
      </div>
    </>
  );
};
export default CartProductItem;

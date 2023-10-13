import classes from "./CartProductItem.module.css";
import PlusMinusButton from "../ChildComponents/PlusMinusButton";
import SmallSpinner from "../Utils/SmallSpinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { actions } from "../../Store/StoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { cartProductPATCH } from "../../Store/ActionCreatorThunk";
import { BsX } from "react-icons/bs";
import { queryClient } from "../../Store/ActionCreatorThunk";

// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = (type) => {
  if (type === "deduct") {
    return toast.info("Product deducted.🙁", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
    });
  } else if (type === "add") {
    return toast.info("Quantity increased.👍", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
    });
  } else if (type === "totalremove") {
    return toast.error("Product removed.🛒", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
    });
  }
};

// PRODUCT WHICH SHOWS ON CART PAGE...
const CartProductItem = (props) => {
  const productToBePatched = useSelector(
    (state) => state.sliceOne.cartProductToBePatched
  );
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const dispatch = useDispatch();

  const { title, price, images, catagory, quantity, key, _id } = props.elem;
  const isCartOn = props.isCartOn;
  const elem = props.elem;

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ["cartPatch"],
    mutationFn: async (patchtype) => {
      return cartProductPATCH(productToBePatched, cookie, patchtype);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProd"] });
    },
  });

  const addItemHandler = () => {
    dispatch(actions.AddItemToCart(elem));
    dispatch(actions.cartProduct_Patch(_id));
    notifyFn("add");
    mutate("normal_patch");
  };
  const item_deduct_fnc = () => {
    dispatch(actions.RemoveItemfromCart(elem));
    dispatch(actions.cartProduct_Patch(_id));
    if (quantity > 1) {
      notifyFn("deduct");
      mutate("normal_patch");
    } else if (quantity === 1) {
      notifyFn("totalremove");
      mutate({ type: "delete_patch", id: elem._id });
    }
  };
  const removeItemFromCart_Handler = () => {
    dispatch(actions.totalRemoveFromCart(elem));
    notifyFn("totalremove");
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
            {isLoading ? (
              <SmallSpinner />
            ) : (
              <div>
                <h3>{title}</h3>
                <h4>${price}</h4>
              </div>
            )}

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
        <ToastContainer />
      </div>
    </>
  );
};
export default CartProductItem;

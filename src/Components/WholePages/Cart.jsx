import CartWhenItems from "../ChildComponents/CartWhenItems";
import WithoutItems from "../UI/WithoutItems";
import LoadingSpinner from "../Utils/LoadingSpinner";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { cartProductsLoader } from "../../Store/ActionCreatorThunk";

const Cart = () => {
  const isCartEmpty = useSelector((state) => state.sliceOne.isCartEmpty);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const dispatch = useDispatch();

  const enableVal = cookie ? true : false;
  const { data, isError, isPending, isLoading } = useQuery({
    queryKey: ["cartProd"],
    queryFn: async () => {
      return cartProductsLoader(cookie);
    },
    enabled: enableVal,
  });

  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };

  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (data === undefined) return;
    if (data.status === "success") {
      console.log(data.data);
      dispatch(actions.cartArray_Change(data.data));
    }
  }, [data, cookie]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isCartEmpty && (
        <WithoutItems
          link="/favourites"
          title={`Product says 'It Look so empty without me!`}
          subTitle={`Bag is empty , Let's add some products`}
          btnText={`Add Items from Favourite Lists`}
          subMenuToggler={submenuRemover}
        />
      )}
      {!isCartEmpty && <CartWhenItems subMenuToggler={submenuRemover} />}
    </>
  );
};

export default Cart;
// Product says 'It Look so empty without me!
// Bag is empty , Let's add some products.
// Add Items from Favourite Lists

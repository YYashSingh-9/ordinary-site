import classes from "./Favourites.module.css";
import FavouriteCard from "../UI/FavouriteCard";
import WithoutItems from "../UI/WithoutItems";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useQuery } from "@tanstack/react-query";
import { getMyFavs } from "../../Store/ActionCreatorThunk";
import { useEffect } from "react";
const FavWhenItems = (props) => {
  let buttonState = true;
  const submenuFn = () => {
    props.subMenuToggler();
  };
  return (
    <>
      <section className={classes.CartSection} onClick={submenuFn}>
        <div className={classes.cartHeading}>
          <h2>CART ITEMS</h2>
        </div>
        <div className={classes.cartProductListDiv}>
          {props.Favarray.map((el) => (
            <FavouriteCard key={el.key} elem={el} btnState={buttonState} />
          ))}
        </div>
      </section>
    </>
  );
};

const Favourites = () => {
  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const enableVal = cookie ? true : false;
  const { data, isError, isPending } = useQuery({
    queryKey: ["cartProd"],
    queryFn: async () => {
      return getMyFavs(cookie);
    },
    enabled: enableVal,
  });
  const dispatch = useDispatch();
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };
  const favarray = productList.filter((elem) => {
    return elem.isFav === true;
  });
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (data && data.status === "success") {
      console.log(data);
      dispatch(actions.products_Modified_With_Fav(data));
    }
  }, [cookie, data]);
  return (
    <>
      {favarray.length ? (
        <FavWhenItems Favarray={favarray} subMenuToggler={submenuRemover} />
      ) : (
        <WithoutItems
          link="/bestsellers"
          title={`Product says 'It Look so empty without me!`}
          subTitle={`Wishlist is empty , Let's find some products.`}
          btnText={`Add Items from Best Sellers`}
          subMenuToggler={submenuRemover}
        />
      )}
    </>
  );
};

export default Favourites;

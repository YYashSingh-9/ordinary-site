import classes from "./MyOrders.module.css";
import FavouriteCard from "../UI/FavouriteCard";
import { useSelector, useDispatch } from "react-redux";
import emptyCartImage from "../../assets/market.png";
import { NavLink } from "react-router-dom";
import { actions } from "../../Store/StoreSlice.jsx";
import { getMyOrders } from "../../Store/ActionCreatorThunk";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
//HELPER JSX COMPONENTS
const OrderCard = (props) => {
  const { title, price, images, key, isFav, _id } = props.elem;
  return (
    <>
      <div className={classes.favCardParentDiv}>
        <div className={classes.productInfos}>
          <div className={classes.title}>
            <h3>{title}</h3>
          </div>
          <div className={classes.prices}>
            <span>
              <h4>{`$ ${price}`}</h4>
            </span>
            <span>
              <h4 className={classes.cuttedPrice}>{`$ 33`}</h4>
            </span>
            <span>
              <h4 className={classes.offerPrice}>{`(60% OFF)`}</h4>
            </span>
          </div>
        </div>
        <div className={classes.orderId}>
          <h3>Order ID:</h3>
          <p>34y913y491y3741734y1734y8</p>

          <h4>Your order will be delivered in 3 days.</h4>
        </div>
      </div>
    </>
  );
};
const EmptyCart = (props) => {
  return (
    <>
      <div className={classes.mainCart} onClick={props.toggleFn}>
        <div className={classes.cartImg}>
          <img src={emptyCartImage} />
        </div>
        <div className={classes.title}>
          <h4>Your orders Cart is empty.. let's make an order</h4>
          <NavLink to="/bestsellers">
            <button className={classes.linkBtn}>Click here</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

const MyOrders = () => {
  const myOrders = useSelector((state) => state.sliceOne.myOrders);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const dispatch = useDispatch();
  const enableVal = cookie ? true : false;
  const { data } = useQuery({
    queryKey: ["ordersProd"],
    queryFn: () => {
      return getMyOrders(cookie);
    },
    enabled: enableVal,
  });
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (data) {
      dispatch(actions.orderedProductsChange(data.data));
    }
  }, [cookie]);
  return (
    <>
      {myOrders.length ? (
        <section className={classes.CartSection}>
          <div className={classes.cartHeading}>
            <h2>MY ORDERS</h2>
          </div>
          <div className={classes.cartProductListDiv}>
            {myOrders.map((el) => (
              <OrderCard key={el._id} elem={el} />
            ))}
          </div>
        </section>
      ) : (
        <EmptyCart toggleFn={submenuRemover} />
      )}
    </>
  );
};

export default MyOrders;

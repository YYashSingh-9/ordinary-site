import { NavLink } from "react-router-dom";
import classes from "./OrderRedirectPage.module.css";

const OrderRedirectPage = () => {
  return (
    <>
      <section className={classes.mainORPage}>
        <div className={classes.heading}>WooHoo!! Order Placed. 😁</div>
        <div className={classes.redirectBtn}>
          <button className={classes.rBtn}>
            <NavLink to="/account-details/my_orders">Check Order</NavLink>
          </button>
        </div>
      </section>
    </>
  );
};

export default OrderRedirectPage;

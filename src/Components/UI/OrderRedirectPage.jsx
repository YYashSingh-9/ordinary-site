import classes from "./OrderRedirectPage.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = () => {
  return toast.success("Order is placed.😁", {
    position: "top-right",
    theme: "colored",
    autoClose: 2000,
  });
};
const OrderRedirectPage = () => {
  useEffect(() => {
    notifyFn();
  }, []);
  return (
    <>
      <section className={classes.mainORPage}>
        <div className={classes.heading}>WooHoo!! Order Placed. 😁</div>
        <div className={classes.redirectBtn}>
          <button className={classes.rBtn}>
            <NavLink to="/account-details/my_orders">Check Order</NavLink>
          </button>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default OrderRedirectPage;

import { useSelector } from "react-redux";
import classes from "./CartWhenItems.module.css";
import CartProductItem from "../UI/CartProductItem";
import { useMutation } from "@tanstack/react-query";
import {
  queryClient,
  placeOrder_Function,
} from "../../Store/ActionCreatorThunk";
import { useNavigate } from "react-router-dom";
// ________ ADDITIONAL COMPONENT
const CouponComponent = () => {
  return (
    <>
      <div className={classes.CouponMain}>
        <h3>Buying for a loved one ?</h3>
        <p>
          Gift Wrap and Personalised message for <br /> $1.5
        </p>
        <h5 className={classes.buttonH3}>ADD Gift Wrap</h5>
      </div>
    </>
  );
};
const PriceDetailComponent = (props) => {
  return (
    <>
      <div className={classes.priceDetailComponent}>
        <h3>{props.title}</h3>
        {props.title === "Convenience Fee" ? (
          <span style={{ display: "flex" }}>
            <p className={classes.line}>${props.price}</p>
            <p style={{ color: "green" }}>FREE</p>
          </span>
        ) : (
          <p>${props.price}</p>
        )}
      </div>
    </>
  );
};
// _________

// MAIN CART COMPONENT ___
const CartWhenItems = (props) => {
  const productList = useSelector((state) => state.sliceOne.AddToCart_Array);
  const totalAmount = useSelector((state) => state.sliceOne.CartTotal);
  const mrp = useSelector((state) => state.sliceOne.TotalMrp);
  const discPrice = useSelector((state) => state.sliceOne.DiscountPrice);
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const Navigate = useNavigate();
  console.log(cookieToken);
  //Getting all the product ids in cart for order.
  let orderProductIDs = [];
  for (let key in productList) {
    orderProductIDs.push(productList[key]._id);
  }
  const { mutate } = useMutation({
    mutationFn: () => {
      return placeOrder_Function(orderProductIDs, cookieToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProd"] });
    },
  });
  console.log(orderProductIDs);
  const subMenuToggler = () => {
    props.subMenuToggler();
  };

  const placeOrderHandler = () => {
    mutate();
    Navigate("/my_orders/redirect-to-order");
  };
  return (
    <>
      <section className={classes.CartSection} onClick={subMenuToggler}>
        <div className={classes.cartHeading} onClick={subMenuToggler}>
          <h2>CART ITEMS</h2>
        </div>
        <div className={classes.CartMain}>
          <div className={classes.cartProductListDiv}>
            {productList.map((el) => (
              <CartProductItem key={el._id} elem={el} />
            ))}
          </div>

          <div className={classes.cartOrderDiv}>
            <div className={classes.Inside}>
              <div className={classes.couponSection}>
                <h3>Coupon</h3>
                <div className={classes.applycoupon}>
                  <h4>Apply Coupon</h4>
                  <button>
                    <h4>Add Coupon</h4>
                  </button>
                </div>
              </div>
              <div className={classes.gifting}>
                <h3>Gifting Personalisation</h3>
                <CouponComponent />
              </div>
              <div className={classes.priceDetails}>
                <div>
                  <h2>price details</h2>
                </div>
                <div className={classes.pricesPart}>
                  <PriceDetailComponent title="Total MRP" price={mrp} />
                  <PriceDetailComponent
                    title="Discount on MRP"
                    price={discPrice}
                  />
                  <PriceDetailComponent title="Convenience Fee" price={10} />
                </div>
              </div>
              <div className={classes.total_N_Order}>
                <div className={classes.total_titles}>
                  <h3>Total Amount</h3>
                  <h3>${totalAmount}</h3>
                </div>
                <div className={classes.btnDiv}>
                  <button onClick={placeOrderHandler}>Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartWhenItems;

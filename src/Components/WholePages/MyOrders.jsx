import classes from "./MyOrders.module.css";
import FavouriteCard from "../UI/FavouriteCard";
import { useSelector } from "react-redux";
import emptyCartImage from "../../assets/market.png";
import { NavLink } from "react-router-dom";
const OrderCard = (props) => {
  const { title, price, images, key, isFav, _id } = props.elem;
  return (
    <>
      <div className={classes.favCardParentDiv}>
        <div className={classes.imgAndCloseDiv}>
          <div className={classes.favImg}>
            <img src={images} />
          </div>
        </div>
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
const EmptyCart = () => {
  return (
    <>
      <div className={classes.mainCart}>
        <div className={classes.cartImg}>
          <img src={emptyCartImage} />
        </div>
        <div className={classes.title}>
          <h3>Your orders Cart is empty.. let's make an order</h3>
          <NavLink to="bestseller">
            <button>Click here</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
const MyOrders = () => {
  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);
  console.log(productList);
  const favarray = productList.filter((elem) => {
    return elem.isFav === true;
  });
  console.log(favarray);
  return (
    <>
      <section className={classes.CartSection}>
        <div className={classes.cartHeading}>
          <h2>MY ORDERS</h2>
        </div>
        <div className={classes.cartProductListDiv}>
          {productList
            .map((el) => <OrderCard key={el.key} elem={el} />)
            .slice(0, 2)}
        </div>
      </section>
    </>
  );
};

export default MyOrders;

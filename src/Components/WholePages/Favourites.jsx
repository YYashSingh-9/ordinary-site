import { useSelector, useDispatch } from "react-redux";
import classes from "./Favourites.module.css";
import CartProductItem from "../UI/CartProductItem";
import WithoutItems from "../UI/WithoutItems";
const FavWhenItems = (props) => {
  return (
    <>
      <section className={classes.CartSection}>
        <div className={classes.cartHeading}>
          <h2>CART ITEMS</h2>
        </div>
        <div className={classes.cartProductListDiv}>
          {props.Favarray.map((el) => (
            <CartProductItem key={el.key} elem={el} />
          ))}
        </div>
      </section>
    </>
  );
};

const Favourites = () => {
  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);
  const favarray = productList.filter((elem) => {
    return elem.isFav === true;
  });
  console.log(favarray);
  return (
    <>
      {favarray.length ? (
        <FavWhenItems Favarray={favarray} />
      ) : (
        <WithoutItems
          link="/bestsellers"
          title={`Product says 'It Look so empty without me!`}
          subTitle={`Wishlist is empty , Let's find some products.`}
          btnText={`Add Items from Best Sellers`}
        />
      )}
    </>
  );
};

export default Favourites;

import { useSelector, useDispatch } from "react-redux";
import classes from "./Favourites.module.css";
import CartProductItem from "../UI/CartProductItem";
import ProductItem from "../ChildComponents/ProductItem";
import FavouriteCard from "../UI/FavouriteCard";
import WithoutItems from "../UI/WithoutItems";
const FavWhenItems = (props) => {
  let buttonState = true;
  return (
    <>
      <section className={classes.CartSection}>
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
{
  /* <CartProductItem key={el.key} elem={el} />; */
}
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

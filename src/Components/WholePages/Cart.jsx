import CartWhenItems from "../ChildComponents/CartWhenItems";
import WithoutItems from "../UI/WithoutItems";
import { useSelector } from "react-redux";
const Cart = () => {
  const isCartEmpty = useSelector((state) => state.sliceOne.isCartEmpty);

  return (
    <>
      {isCartEmpty ? (
        <WithoutItems
          link="/favourites"
          title={`Product says 'It Look so empty without me!`}
          subTitle={`Bag is empty , Let's add some products`}
          btnText={`Add Items from Favourite Lists`}
        />
      ) : (
        <CartWhenItems />
      )}
    </>
  );
};

export default Cart;
// Product says 'It Look so empty without me!
// Bag is empty , Let's add some products.
// Add Items from Favourite Lists

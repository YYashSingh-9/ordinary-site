import classes from "./CartWithoutItems.module.css";
import bagImg from "../../../assets/bag.png";
import { NavLink } from "react-router-dom";

// ANOTHER EITHER COMPONENT FOR SITUATIONAL RENDERS (can be seen when no items are there in Cart🛒/fav❤ page)
const CartWithoutItems = () => {
  return (
    <>
      <section className={classes.ParentDiv}>
        <div className={classes.CenterDiv}>
          <div className={classes.ImgDiv}>
            <img src={bagImg} />
          </div>
          <div className={classes.writtens}>
            <h2>Product says 'It Look so empty without me! </h2>
            <p>Bag is empty , Let's add some products.</p>
          </div>
          <div className={classes.buttonHere}>
            <button>
              <NavLink to="/favourites">Add Items from Favourite Lists</NavLink>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartWithoutItems;

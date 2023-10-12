import classes from "./ProductInfoPage.module.css";
import logo from "../../assets/logo2.png";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { actions } from "../../Store/StoreSlice";
import { useRef, useState } from "react";
import { addToCart_Function } from "../../Store/ActionCreatorThunk";
import { queryClient } from "../../Store/ActionCreatorThunk";
//THIS IS HOW THE RATINGS WILL BE DISPLAYED..
const StarComponent = ({ starPassed }) => {
  const RatingStars = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;

    return (
      <span key={index} className={classes.stars}>
        {starPassed >= index + 1 ? (
          <BsStarFill />
        ) : starPassed >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return <div>{RatingStars}</div>;
};
// Reusable component
const Button = (props) => {
  return (
    <button
      className={classes.btn}
      onClick={props.fnc}
      disabled={props.disableState}
    >
      <NavLink to={props.navRoute}>{props.title}</NavLink>
    </button>
  );
};
const ProductInfoPage = () => {
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const allProducts = useSelector((state) => state.sliceOne.arrayOfProducts);
  const addedProductsArray = useSelector(
    (state) => state.sliceOne.AddToCart_Array
  );
  const pinCodeText = useSelector((state) => state.sliceOne.pincodeText);
  const pincodeState = useSelector((state) => state.sliceOne.pincodeState);
  const pincodeValue = useSelector((state) => state.sliceOne.pincodeVal);
  const isLoggedIn = useSelector((state) => state.sliceOne.isLoggedInState);
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const [btnState, setBtnState] = useState(true);
  const { id, catagory } = useParams();
  const ref = useRef();
  const dispatch = useDispatch();

  // Picking the product with id & catagory.
  const productGotFromArray = allProducts.filter((el) => {
    return el.title === id && el.catagory === catagory;
  });
  const productGot = productGotFromArray[0];
  // Getting all infos to fill in jsx.
  const { title, price, isFav, images, key, _id } = productGot;
  const productForCart = addedProductsArray.find((el) => el._id === _id);

  //SENDING THE REQUEST
  const { mutate } = useMutation({
    mutationKey: ["cartProd-send", key],
    mutationFn: async () => {
      return await addToCart_Function(currentUser._id, productForCart, cookie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProd"] });
    },
  });

  // Checking if this product is added or not previously.
  let mainArrayToFilter = addedProductsArray;
  const addedProd = mainArrayToFilter.find((el) => el.productId === _id);

  // For showing line-through price.
  const extendedPrice = (price * 3).toFixed(2);
  // For toggling fav button
  const isFavStatus = isFav ? "Already in Favs" : " Favourite this!";
  // For toggling btn text asper login state
  const logState_btn_text =
    isLoggedIn === false ? "Please login" : "Check in cart";

  //FUNCTIONS..
  const AddItemToCartHandler = () => {
    dispatch(actions.AddItemToCart(productGot));
    setBtnState(false);
    mutate();
  };
  const favouriteItemHandler = () => {
    dispatch(actions.FavouriteToggler(key));
  };
  //Pincode functionalities V.1.0 ////______
  const pinCodeToggle = () => {
    let refVal = ref.current;
    if (refVal.value.length >= 6) {
      dispatch(actions.pincodeToggle());
      dispatch(actions.pincodeFormToggler());
    }
  };
  const pinOnchange = (e) => {
    const value = e.target.value;
    dispatch(actions.pincodeTyper(value));
  };
  //________________________________________
  return (
    <>
      <section className={classes.mainProductDiv}>
        <div className={classes.topTitle}>Home /products / hair Creme</div>
        <section className={classes.mainDiv}>
          <div className={classes.productImg}>
            <div className={classes.imgContainer}>
              <img src={images} />
            </div>
          </div>
          <div className={classes.productDetails}>
            <div className={classes.heading}>
              <div className={classes.insideLogo}>
                <img src={logo} />
              </div>
            </div>
            <div className={classes.details}>
              <div>
                <h2>{`${title} BY THE ORDINARY`}</h2>
              </div>
              <div>
                <StarComponent starPassed={4.5} />
              </div>
              <div>
                <div className={classes.prices}>
                  <h3 className={classes.discPrice}>{`$${extendedPrice}`}</h3>
                  <h3>{`$${price}`}</h3>
                </div>
                <h4>Discount of 25%</h4>
              </div>
              <div className={classes.actionBtns}>
                {!addedProd && btnState && isLoggedIn ? (
                  <Button
                    title="Add to Basket"
                    fnc={AddItemToCartHandler}
                    disableState={false}
                    navRoute={null}
                  />
                ) : (
                  <Button
                    title={logState_btn_text}
                    disableState={isLoggedIn ? false : true}
                    navRoute="/cart"
                  />
                )}

                <Button
                  title={isFavStatus}
                  fnc={favouriteItemHandler}
                  disableState={isFav}
                />
              </div>
              <div className={classes.pincode_check}>
                <div className={classes.fill_pincode}>
                  <input
                    type="number"
                    placeholder="ex-495001"
                    ref={ref}
                    value={pincodeValue}
                    onChange={pinOnchange}
                  />
                  <button type="submit" onClick={pinCodeToggle}>
                    {!pincodeState ? "check" : "change"}
                  </button>
                </div>
                <div className={classes.pincode_result}>
                  <p>{pincodeState && pinCodeText}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default ProductInfoPage;

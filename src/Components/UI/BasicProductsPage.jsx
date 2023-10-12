import classes from "./BasicProductsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CiFilter } from "react-icons/ci";
import { cartProductsLoader } from "../../Store/ActionCreatorThunk";
import ProductItem from "../ChildComponents/ProductItem";
import FilterComponent from "../ChildComponents/FilterComponent";
import LoadingSpinner from "../Utils/LoadingSpinner";

//THIS PAGE IS USED AS A SHELL FOR MANY ROUTES :) ONLY DATA CHANGES -D.R.Y
//HELPER FUNCTIONS
const paramConversion = (stringPassed) => {
  const returnParam =
    stringPassed.toString().charAt(0).toUpperCase() +
    stringPassed.toString().slice(1);
  return returnParam;
};
//RE-USABLE COMPONENT - D.R.Y
const Pages = (props) => {
  let type = props.type;
  const pagerFunc = () => {
    console.log(type);
    props.fn_to_inc(type);
  };
  return <h3 onClick={pagerFunc}>{props.pg_n}</h3>;
};

const BasicProductsPage = () => {
  const { id } = useParams();
  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const sliceVals = useSelector((state) => state.sliceOne.sliceValues);
  const minPrice = useSelector((state) => state.sliceOne.minPriceVal);
  const maxPrice = useSelector((state) => state.sliceOne.maxPriceVal);
  const searchTerm = useSelector((state) => state.sliceOne.searchedTerm);
  const cookie = useSelector((state) => state.sliceOne.cookieTokenVal);
  const typeSelected = useSelector(
    (state) => state.sliceOne.typeSelectVariable
  );
  const dispatch = useDispatch();
  const enableVal = cookie ? true : false;
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cartProd"],
    queryFn: async () => {
      return cartProductsLoader(cookie);
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
  const pagerFn = (type) => {
    dispatch(actions.pageIncrement(type));
  };

  const paramRecieved = paramConversion(id);

  const specificProductArray = productList.filter(
    (el) => el.catagory === paramRecieved
  );
  let finalProductsArrayToDisplay =
    paramRecieved === "Bestsellers" ? productList : specificProductArray;

  //USING/MANAGING FILTERS ON THE FINAL ARRAY..
  //1.Range selection..
  finalProductsArrayToDisplay = finalProductsArrayToDisplay.filter((el) => {
    return el.price >= minPrice && el.price <= maxPrice;
  });
  //2.Type selection..
  if (typeSelected !== null)
    finalProductsArrayToDisplay = finalProductsArrayToDisplay.filter((el) => {
      return el.catagory === typeSelected;
    });
  if (typeSelected === "none") {
    finalProductsArrayToDisplay =
      paramRecieved === "Bestsellers" ? productList : specificProductArray;
  }
  //3.Search filtering
  if (searchTerm)
    finalProductsArrayToDisplay = finalProductsArrayToDisplay.filter((el) =>
      el.title.includes(searchTerm)
    );

  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (data === undefined) return;
    if (data.status === "success") {
      dispatch(actions.cartArray_Change(data.data));
    }
  }, [data, cookie]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className={classes.thisSection} onClick={submenuRemover}>
          <div className={classes.routeDenoter}>
            {id === "bestsellers" ? (
              <p> Home / {id} </p>
            ) : (
              <p> Home /catalogue/{id} </p>
            )}
          </div>
          <div className={`${classes.ParentProductsDiv} ${classes.nfilter}`}>
            <div className={classes.FiltersPart}>
              <FilterComponent />
            </div>
            <div className={classes.secondSideDiv}>
              <div className={classes.heading}>
                <h2 className={classes.ech2}>{id}</h2>
                <CiFilter className={classes.filterlogo} />
              </div>

              <div className={classes.ProductsListPart}>
                {finalProductsArrayToDisplay
                  .map((el) => <ProductItem key={el.key} elem={el} />)
                  .slice(sliceVals[0], sliceVals[1])}
              </div>
            </div>
          </div>
          {finalProductsArrayToDisplay.length > 10 && (
            <div className={classes.pagination}>
              <Pages pg_n="1 ," type="decrement" fn_to_inc={pagerFn} />
              <Pages pg_n="2" type="increment" fn_to_inc={pagerFn} />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default BasicProductsPage;

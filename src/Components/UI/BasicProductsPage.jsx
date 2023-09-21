import classes from "./BasicProductsPage.module.css";
import { useSelector } from "react-redux";
import ProductItem from "../ChildComponents/ProductItem";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../ChildComponents/FilterComponent";
import { useParams } from "react-router-dom";

//HELPER FUNCTIONS
const paramConversion = (stringPassed) => {
  const returnParam =
    stringPassed.toString().charAt(0).toUpperCase() +
    stringPassed.toString().slice(1);
  return returnParam;
};

const BasicProductsPage = () => {
  const { id } = useParams();

  const paramRecieved = paramConversion(id);
  console.log(paramRecieved);

  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);
  const specificProductArray = productList.filter(
    (el) => el.catagory === paramRecieved
  );

  const finalProductsArrayToDisplay =
    paramRecieved === "Bestsellers" ? productList : specificProductArray;
  return (
    <>
      <section className={classes.thisSection}>
        <div className={classes.routeDenoter}>
          {id === "bestsellers" ? (
            <p> Home / {id} </p>
          ) : (
            <p> Home /catalogue/{id} </p>
          )}
        </div>
        <div className={`${classes.ParentProductsDiv} ${classes.nfilter}`}>
          <div className={classes.FiltersPart}>
            {/* <div className={classes.searchNfilter}>
              <h2>FILTER</h2>
              <input type="text" placeholder="Search" />

              <select name="Shop by" id="shopby">
                <option value="Hair">Hair</option>
                <option value="perfume">Perfumes</option>
                <option value="Serums">Serums</option>
              </select>
              <select name="Price Range" id="pricerange">
                <option value="2">+ $2</option>
                <option value="3">+ $3</option>
              </select>
            </div> */}
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
                .slice(0, 9)}
            </div>
          </div>
        </div>
        <div className={classes.pagination}>
          <h3>1 ,</h3>
          <h3>2 ,</h3>
          <h3>3</h3>
        </div>
      </section>
    </>
  );
};

export default BasicProductsPage;

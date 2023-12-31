import classes from "./FilterComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const FilterComponent = () => {
  const minPrice = useSelector((state) => state.sliceOne.minPriceVal);
  const maxPrice = useSelector((state) => state.sliceOne.maxPriceVal);
  const dispatch = useDispatch();

  // Range filter___👍
  const setMinPriceHandler = (e) => {
    const target = e.target.value;
    dispatch(actions.setMinPrice(target));
  };
  const setMaxPriceHandler = (e) => {
    const target = e.target.value;
    dispatch(actions.setMaxPrice(target));
  };
  // Catagory type filter___👍
  const typeSelectHandler = (e) => {
    const target = e.target.value;
    dispatch(actions.selectType(target));
  };
  // Product name search filter___👍
  const searchtFn = (e) => {
    const targetVal = e.target.value;
    dispatch(actions.searchFilter(targetVal));
  };
  return (
    <>
      <div className={classes.searchNfilter}>
        <h2>FILTER</h2>
        <input
          type="text"
          placeholder="Search (type ' serum ')"
          className={classes.searchInput}
          onChange={searchtFn}
        />

        <select
          name="Shop by"
          id="shopby"
          onChange={typeSelectHandler}
          defaultValue=""
          placeholder=""
        >
          <option value="Hair">Hair</option>
          <option value="Fragrences">Fragrences</option>
          <option value="Skincare">Skincare</option>
          <option value="none">None</option>
        </select>

        <div className={classes.priceRangeDiv}>
          <div className={classes.texts}>
            <div className={classes.min}>
              <h3>Min</h3>
              <h4>${minPrice}</h4>
            </div>
            <div className={classes.max}>
              <h3>Max</h3>
              <h4>${maxPrice}</h4>
            </div>
          </div>
          <div className={classes.rangeHandler}>
            <input
              type="range"
              defaultValue={minPrice}
              max="5"
              min="0"
              onChange={setMinPriceHandler}
              className={classes.range}
            />
            <input
              type="range"
              defaultValue={maxPrice}
              max="10"
              min="5"
              onChange={setMaxPriceHandler}
              className={classes.range}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;

import classes from "./FilterComponent.module.css";

const FilterComponent = () => {
  return (
    <>
      <div className={classes.searchNfilter}>
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
      </div>
    </>
  );
};

export default FilterComponent;

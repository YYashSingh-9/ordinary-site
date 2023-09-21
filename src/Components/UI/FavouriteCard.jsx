import classes from "./FavouriteCard.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
const FavouriteCard = (props) => {
  const { title, price, images, key, isFav } = props.elem;
  const extendedPrice = (price * 3).toFixed(2);
  return (
    <>
      <div className={classes.favCardParentDiv}>
        <div className={classes.imgAndCloseDiv}>
          <div className={classes.favImg}>
            <img src={images} />
          </div>
          <button>
            <AiOutlineCloseCircle />
          </button>
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
              <h4 className={classes.cuttedPrice}>{`$ ${extendedPrice}`}</h4>
            </span>
            <span>
              <h4 className={classes.offerPrice}>{`(60% OFF)`}</h4>
            </span>
          </div>
        </div>
        <div className={classes.addedBtn}>
          <button className={classes.addBtn}>Add to bag</button>
        </div>
      </div>
    </>
  );
};

export default FavouriteCard;

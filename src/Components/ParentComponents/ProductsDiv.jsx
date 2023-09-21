import DivCard from "../UI/DivCard";
import ProductItem from "../ChildComponents/ProductItem";
import { useSelector } from "react-redux";

const ProductsDiv = (props) => {
  const productList = useSelector((state) => state.sliceOne.arrayOfProducts);

  return (
    <>
      <DivCard title={props.title}>
        {productList
          .map((el) => <ProductItem key={el.key} elem={el} />)
          .slice(props.sliceInit, props.sliceEnd)}
      </DivCard>
    </>
  );
};

export default ProductsDiv;

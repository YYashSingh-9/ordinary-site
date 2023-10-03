import HeaderMiddle from "./Components/ParentComponents/HeaderMiddle";
import ProductsDiv from "./Components/ParentComponents/ProductsDiv";
import CataloguesDiv from "./Components/ParentComponents/CataloguesDiv";
import BlogDiv from "./Components/ParentComponents/BlogDiv";
import AboutDiv from "./Components/ParentComponents/AboutDiv";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "./Store/StoreSlice";
import { useEffect } from "react";

function App() {
  const document = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.productsArray_Change(document.data));
  }, [document]);

  return (
    <>
      <HeaderMiddle />
      <ProductsDiv title="best sellers" sliceInit={0} sliceEnd={4} />
      <CataloguesDiv />
      <ProductsDiv title="popular" sliceInit={5} sliceEnd={9} />
      <BlogDiv />
      <AboutDiv />
    </>
  );
}

export default App;

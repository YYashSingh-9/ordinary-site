import HeaderMiddle from "./Components/ParentComponents/HeaderMiddle";
import ProductsDiv from "./Components/ParentComponents/ProductsDiv";
import CataloguesDiv from "./Components/ParentComponents/CataloguesDiv";
import BlogDiv from "./Components/ParentComponents/BlogDiv";
import AboutDiv from "./Components/ParentComponents/AboutDiv";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./Store/StoreSlice";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
function App() {
  const document = useLoaderData();
  const dispatch = useDispatch();
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);

  useEffect(() => {
    dispatch(actions.productsArray_Change(document.data));
    console.log("one");
  }, [document]);
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    console.log("two");
  }, [cookieToken]);

  return (
    <>
      <CookiesProvider>
        <HeaderMiddle />
        <ProductsDiv title="best sellers" sliceInit={0} sliceEnd={4} />
        <CataloguesDiv />
        <ProductsDiv title="popular" sliceInit={5} sliceEnd={9} />
        <BlogDiv />
        <AboutDiv />
      </CookiesProvider>
    </>
  );
}

export default App;

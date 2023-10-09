import HeaderMiddle from "./Components/ParentComponents/HeaderMiddle";
import ProductsDiv from "./Components/ParentComponents/ProductsDiv";
import CataloguesDiv from "./Components/ParentComponents/CataloguesDiv";
import BlogDiv from "./Components/ParentComponents/BlogDiv";
import AboutDiv from "./Components/ParentComponents/AboutDiv";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./Store/StoreSlice";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { cartProductsLoader } from "./Store/ActionCreatorThunk";

function App() {
  const document = useLoaderData();
  const dispatch = useDispatch();
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);

  const enableVal = cookieToken ? true : false;
  const { data, isError, isPending } = useQuery({
    queryKey: ["cartProd"],
    queryFn: async () => {
      return cartProductsLoader(cookieToken);
    },
    enabled: enableVal,
  });
  useEffect(() => {
    dispatch(actions.productsArray_Change(document.data));
    if (data === undefined) return;
    if (data.status === "success") {
      console.log(data.data);
      dispatch(actions.cartArray_Change(data.data));
    }
  }, [document, data]);
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
  }, [cookieToken]);

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

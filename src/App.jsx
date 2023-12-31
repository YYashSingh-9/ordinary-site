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
import { cartProductsLoader, getMyFavs } from "./Store/ActionCreatorThunk";

const customQueryHook = (enableVal, cookie) => {
  const productLoader = useQuery({
    queryKey: ["cartProd"],
    queryFn: async () => {
      return cartProductsLoader(cookie);
    },
    enabled: enableVal,
  });
  const favsLoader = useQuery({
    queryKey: ["favProd"],
    queryFn: async () => {
      return getMyFavs(cookie);
    },
    enabled: enableVal,
  });
  return [productLoader, favsLoader];
};

function App() {
  const document = useLoaderData();
  const dispatch = useDispatch();
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const enableVal = cookieToken ? true : false;

  const [{ data: ProdData }, { data: FavData }] = customQueryHook(
    enableVal,
    cookieToken
  );

  const data = ProdData;
  const data2 = FavData;
  useEffect(() => {
    dispatch(actions.productsArray_Change({ array1: document, array2: data2 }));
    if (data === undefined) return;
    if (data.status === "success") {
      dispatch(actions.cartArray_Change(data.data));
    }
  }, [document, data, data2]);
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
  }, [cookieToken]);

  return (
    <>
      {!document && <p>loading</p>}
      <HeaderMiddle />
      <ProductsDiv title="bestsellers" sliceInit={0} sliceEnd={4} />
      <CataloguesDiv />
      <ProductsDiv title="popular" sliceInit={5} sliceEnd={9} />
      <BlogDiv />
      <AboutDiv />
    </>
  );
}

export default App;

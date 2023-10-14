import classes from "./AccountsPage.module.css";
import WhenLoggedOut from "../ChildComponents/WithoutItemsUI/WhenLoggedOut";
import WhenLoggedIn from "../ChildComponents/WhenLoggedIn";
import { useSelector } from "react-redux";
import { useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useEffect } from "react";
import SmallSpinner from "../Utils/SmallSpinner";

const AccountsPage = () => {
  const isLoggedInState = useSelector(
    (state) => state.sliceOne.isLoggedInState
  );
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const dispatch = useDispatch();
  const data = useActionData();
  const loaderData = useLoaderData();
  const navigation = useNavigation();

  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };

  const title =
    navigation.state === "loading" || navigation.state === "submitting" ? (
      <SmallSpinner />
    ) : (
      "Your Accounts Page"
    );
  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (loaderData.status === "success") {
      dispatch(actions.productsArray_Change({ array1: loaderData }));
    }
    if (data) {
      console.log(data.status, data);
      if (data.token) {
        data.status === "success" && dispatch(actions.loginStateToggle());
        data.token && dispatch(actions.set_token_to_localStorage(data));
      }
    }
  }, [data]);

  return (
    <>
      <section className={classes.mainDiv} onClick={submenuRemover}>
        <div className={classes.titleA}>{title}</div>

        <div className={classes.infoDiv}>
          {cookieToken || isLoggedInState ? (
            <WhenLoggedIn />
          ) : (
            <WhenLoggedOut />
          )}
        </div>
      </section>
    </>
  );
};

export default AccountsPage;

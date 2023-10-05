import classes from "./AccountsPage.module.css";
import WhenLoggedOut from "../ChildComponents/WithoutItemsUI/WhenLoggedOut";
import WhenLoggedIn from "../ChildComponents/WhenLoggedIn";
import { useSelector } from "react-redux";
import { useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useEffect } from "react";
import { testCart } from "../../Store/ActionCreatorThunk";

const AccountsPage = () => {
  const dispatch = useDispatch();
  const data = useActionData();
  const isLoggedInState = useSelector(
    (state) => state.sliceOne.isLoggedInState
  );
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);

  useEffect(() => {
    dispatch(actions.get_token_from_localStorage());
    if (data) {
      console.log("haha", data.status, data);
      data.status === "success" && dispatch(actions.loginStateToggle());
      data.token && dispatch(actions.set_token_to_localStorage(data.token));
    }
  }, [data]);
  //youngestbillionaire

  return (
    <>
      <section className={classes.mainDiv}>
        <div className={classes.title}>Your Accounts Page</div>
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

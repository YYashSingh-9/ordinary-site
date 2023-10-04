import classes from "./AccountsPage.module.css";
import WhenLoggedOut from "../ChildComponents/WithoutItemsUI/WhenLoggedOut";
import WhenLoggedIn from "../ChildComponents/WhenLoggedIn";
import { useSelector } from "react-redux";
import { useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import { useEffect } from "react";

const AccountsPage = () => {
  const dispatch = useDispatch();
  const data = useActionData();
  const isLoggedInState = useSelector(
    (state) => state.sliceOne.isLoggedInState
  );
  useEffect(() => {
    if (data) {
      console.log("haha", data.status, data);
      data.status === "success" && dispatch(actions.loginStateToggle());
    }
  }, [data]);
  //youngestbillionaire
  return (
    <>
      <section className={classes.mainDiv}>
        <div className={classes.title}>Your Accounts Page</div>
        <div className={classes.infoDiv}>
          {isLoggedInState ? <WhenLoggedIn /> : <WhenLoggedOut />}
        </div>
      </section>
    </>
  );
};

export default AccountsPage;

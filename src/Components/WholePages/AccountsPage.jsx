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
  const cookieState = useSelector((state) => state.sliceOne.testState);

  useEffect(() => {
    if (data) {
      console.log("haha", data.status, data);
      data.status === "success" && dispatch(actions.loginStateToggle());
      dispatch(actions.testFn(data.token));
    }
  }, [data]);
  //youngestbillionaire
  const clickfn = () => {
    testCart(cookieState);
  };
  return (
    <>
      <section className={classes.mainDiv}>
        <div className={classes.title} onClick={clickfn}>
          Your Accounts Page
        </div>
        <div className={classes.infoDiv}>
          {isLoggedInState ? <WhenLoggedIn /> : <WhenLoggedOut />}
        </div>
      </section>
    </>
  );
};

export default AccountsPage;

import classes from "./AccountsPage.module.css";
import WhenLoggedOut from "../ChildComponents/WithoutItemsUI/WhenLoggedOut";
import WhenLoggedIn from "../ChildComponents/WhenLoggedIn";
import { useSelector } from "react-redux";

const AccountsPage = () => {
  const isLoggedInState = useSelector(
    (state) => state.sliceOne.isLoggedInState
  );
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

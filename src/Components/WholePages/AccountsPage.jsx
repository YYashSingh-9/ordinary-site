import classes from "./AccountsPage.module.css";
import WhenLoggedOut from "../ChildComponents/WithoutItemsUI/WhenLoggedOut";
import WhenLoggedIn from "../ChildComponents/WhenLoggedIn";
const AccountsPage = () => {
  return (
    <>
      <section className={classes.mainDiv}>
        <div className={classes.title}>Your Accounts Page</div>
        <div className={classes.infoDiv}>
          {/* <WhenLoggedOut /> */}
          <WhenLoggedIn />
        </div>
      </section>
    </>
  );
};

export default AccountsPage;

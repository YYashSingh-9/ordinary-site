import classes from "./WhenLoggedIn.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutSendFunction } from "../../Store/ActionCreatorThunk";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { useEffect } from "react";

// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = (type) => {
  if (type === "logout") {
    return toast.info("User Logged Out", {
      position: "top-right",
      theme: "light",
      autoClose: 2000,
    });
  } else if (type === "firstlogin") {
    return toast.success("user currently is logged in😁", {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
    });
  }
};
const SideDivs = (props) => {
  const link = props.link ? props.link : "";
  return (
    <>
      <div className={classes.sideDiv}>
        <h3>
          <NavLink to={link}>{props.title}</NavLink>
        </h3>
        {props.pThere && <p>{props.pText}</p>}
      </div>
    </>
  );
};

const TableComponent = (props) => {
  return (
    <>
      <table className={classes.tableOne}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>{props.user.name}</th>
          </tr>
          <tr>
            <th>E-mail</th>
            <th>{props.user.email}</th>
          </tr>
          <tr>
            <th>Gender</th>
            <th>{props.user.gender}</th>
          </tr>
          <tr>
            <th>Date of birth</th>
            <th>{!props.user.dob === null ? props.user.dob : "Set D-O-B"}</th>
          </tr>
          <tr>
            <th>Mobile number</th>
            <th>{props.user.mobilenumber}</th>
          </tr>
        </tbody>
      </table>
      <NavLink to="/account-details/edit">
        <button className={classes.editBtn}>Edit</button>
      </NavLink>
    </>
  );
};

const WhenLoggedIn = () => {
  const isLoggedIn = useSelector((state) => state.sliceOne.isLoggedInState);
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFnc = () => {
    logoutSendFunction(cookieToken);
    notifyFn("logout");
    setTimeout(() => {
      dispatch(actions.logout_cookie_remover());
      Navigate("/");
    }, 2600);
  };
  useEffect(() => {
    notifyFn("firstlogin");
  }, []);
  return (
    <>
      {!currentUser ? (
        <LoadingSpinner />
      ) : (
        <section className={classes.mainDiv}>
          <div className={classes.title}>
            <div className={classes.headings}>
              <h2>Account</h2>
              <h3>Yash</h3>
            </div>
            <div className={classes.logoutBtn}>
              {isLoggedIn && <button onClick={logoutFnc}>Logout</button>}
            </div>
          </div>
          <div className={classes.secondDiv}>
            <div className={classes.leftSideDiv}>
              <SideDivs title="overview" pThere={false} link={false} />
              <SideDivs
                title="orders"
                pThere={true}
                pText="orders & returns"
                link="/account-details/my_orders"
              />
              <SideDivs
                title="credits"
                pThere={true}
                pText="coupons"
                link={false}
              />
              <SideDivs
                title="legal"
                pThere={true}
                pText="terms of use"
                link={false}
              />
            </div>
            <div className={classes.rightSideDiv}>
              <div className={classes.pTitle}>
                <h2>Profile details</h2>
              </div>
              <TableComponent user={currentUser} />
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
    </>
  );
};

export default WhenLoggedIn;

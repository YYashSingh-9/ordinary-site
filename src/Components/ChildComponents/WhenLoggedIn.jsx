import classes from "./WhenLoggedIn.module.css";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { logoutSendFunction } from "../../Store/ActionCreatorThunk";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";

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
    dispatch(actions.logout_cookie_remover());
    Navigate("/");
  };

  return (
    <>
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
            <SideDivs
              title="overview"
              pThere={false}
              link="/my_orders/redirect-to-order"
            />
            <SideDivs
              title="orders"
              pThere={true}
              pText="orders & returns"
              link={false}
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
      </section>
    </>
  );
};

export default WhenLoggedIn;

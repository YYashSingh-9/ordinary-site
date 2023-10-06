import classes from "./WhenLoggedIn.module.css";
import { Form, useNavigate } from "react-router-dom";
import { logoutSendFunction } from "../../Store/ActionCreatorThunk";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/StoreSlice";

const SideDivs = (props) => {
  return (
    <>
      <div className={classes.sideDiv}>
        <h3>{props.title}</h3>
        {props.pThere && <p>{props.pText}</p>}
      </div>
    </>
  );
};

const EditForm = (props) => {
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const formToggle = () => {
    props.clickfn();
  };

  return (
    <>
      <Form className={classes.form} method="PATCH" action="/account-details">
        <label>User Name</label>
        <br />
        <input type="text" placeholder="Yash.." name="name" />
        <br />
        <label>User Email</label>
        <br />
        <input type="email" placeholder="user@example.com" name="email" />
        <br />
        <label>Gender</label>
        <select
          name="Select-Gender"
          className={classes.gender}
          defaultValue=""
          placeholder=""
        >
          <option value="Male" id="male">
            Male
          </option>
          <option value="Female" id="female">
            Female
          </option>
        </select>
        <br />
        <br />
        <label>Date-of-Birth</label>
        <br />
        <input type="date" name="dob" />
        <br />
        <label>Mobile number</label>
        <br />
        <input type="text" name="contact number" />
        <br />
        <button
          className={classes.editBtn}
          type="submit"
          name="intent"
          value={cookieToken}
        >
          Save
        </button>
        <button className={classes.editBtn} onClick={formToggle}>
          back
        </button>
      </Form>
    </>
  );
};

const TableComponent = (props) => {
  const formToggle = () => {
    props.clickfn();
  };
  return (
    <>
      <table className={classes.tableOne}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Yash</th>
          </tr>
          <tr>
            <th>E-mail</th>
            <th>yyashsngh@gmail.com</th>
          </tr>
          <tr>
            <th>Gender</th>
            <th>Male</th>
          </tr>
          <tr>
            <th>Date of birth</th>
            <th>-not-added-</th>
          </tr>
          <tr>
            <th>Mobile number</th>
            <th>-not-added-</th>
          </tr>
        </tbody>
      </table>
      <button className={classes.editBtn} type="submit" onClick={formToggle}>
        Edit
      </button>
    </>
  );
};

const WhenLoggedIn = () => {
  const isLoggedIn = useSelector((state) => state.sliceOne.isLoggedInState);
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const formState = useSelector((state) => state.sliceOne.whichFormToShow);
  const currentUser = useSelector((state) => state.sliceOne.currentUserId);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFnc = () => {
    logoutSendFunction(cookieToken);
    dispatch(actions.logout_cookie_remover());
    Navigate("/");
  };
  const formStateToggle = () => {
    dispatch(actions.whichFormToShowToggler());
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
            <SideDivs title="overview" pThere={false} />
            <SideDivs title="orders" pThere={true} pText="orders & returns" />
            <SideDivs title="credits" pThere={true} pText="coupons" />
            <SideDivs title="legal" pThere={true} pText="terms of use" />
          </div>
          <div className={classes.rightSideDiv}>
            <div className={classes.pTitle}>
              <h2>Profile details</h2>
            </div>
            {formState ? (
              <EditForm
                clickfn={formStateToggle}
                cookie={cookieToken}
                currentUser={currentUser}
              />
            ) : (
              <TableComponent clickfn={formStateToggle} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhenLoggedIn;

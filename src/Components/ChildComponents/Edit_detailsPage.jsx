import { useEffect } from "react";
import classes from "./Edit_detailsPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  NavLink,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { actions } from "../../Store/StoreSlice";
import LoadingSpinner from "../Utils/LoadingSpinner";

const P_w_updateForm = () => {
  return (
    <>
      <label>Your New Password</label>
      <br />
      <input type="text" placeholder="password" name="password" />
      <br />
      <label>Your Current Password</label>
      <br />
      <input type="password" placeholder="" name="passwordCurrent" />
    </>
  );
};
const User_info_updates = (props) => {
  return (
    <>
      <label>User Name</label>
      <br />
      <input
        type="text"
        placeholder="Yash.."
        name="name"
        defaultValue={props.user.name}
      />
      <br />
      <label>User Email</label>
      <br />
      <input
        type="email"
        placeholder="user@example.com"
        name="email"
        defaultValue={props.user.email}
      />
      <br />
      <label>Gender</label>
      <select
        name="gender"
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
      <input type="date" name="dob" defaultValue={props.user.dob} />
      <br />
      <label>Mobile number</label>
      <br />
      <input
        type="number"
        name="mobilenumber"
        defaultValue={props.user.mobilenumber}
      />
    </>
  );
};

const EditForm = (props) => {
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  const cookieToken = useSelector((state) => state.sliceOne.cookieTokenVal);
  const whichFormToShow = useSelector(
    (state) => state.sliceOne.whichFormToShow
  );
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const actionData = useActionData();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const navigation = useNavigation();
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };

  let user = { ...currentUser };
  user.dob = new Date(currentUser.dob).toString();
  user.mobilenumber = user.mobilenumber - 0;

  const p_wFormToggle = () => {
    dispatch(actions.whichFormToShowToggler());
  };

  useEffect(() => {
    if (actionData)
      if (actionData.token) {
        dispatch(actions.set_token_to_localStorage(actionData));
        Navigate("/account-details");
      } else if (!actionData.token && actionData.data) {
        dispatch(actions.update_token_from_localStorage(actionData.data));
        Navigate("/account-details");
      }
  }, [actionData]);
  return (
    <>
      <section className={classes.formSection} onClick={submenuRemover}>
        <div className={classes.titleHead}>
          {navigation.state === "submitting" ||
            (navigation.state === "loading" && (
              <progress className={classes.progressBar} />
            ))}
          <h2 className={classes.ech}>Update your details</h2>
        </div>
        <Form className={classes.form} method="PATCH">
          {whichFormToShow ? (
            <User_info_updates user={user} />
          ) : (
            <P_w_updateForm />
          )}
          <br />
          <button
            className={classes.editBtn}
            type="submit"
            name="intent"
            value={cookieToken}
          >
            Save
          </button>
          {whichFormToShow ? (
            <NavLink to="/account-details">
              <button className={classes.editBtn}>Back</button>
            </NavLink>
          ) : (
            <button className={classes.editBtn} onClick={p_wFormToggle}>
              back
            </button>
          )}

          {!whichFormToShow ? (
            ""
          ) : (
            <button className={classes.editBtn} onClick={p_wFormToggle}>
              Update Password
            </button>
          )}
        </Form>
      </section>
    </>
  );
};
export default EditForm;

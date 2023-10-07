import classes from "./Edit_detailsPage.module.css";
import { useSelector } from "react-redux";
import { Form, NavLink } from "react-router-dom";
const EditForm = (props) => {
  const currentUser = useSelector((state) => state.sliceOne.currentUserObject);
  let user = { ...currentUser };
  user.dobb = new Date(currentUser.dob);

  return (
    <>
      <section className={classes.formSection}>
        <h2>Update your details</h2>
        <Form className={classes.form} method="PATCH">
          <label>User Name</label>
          <br />
          <input
            type="text"
            placeholder="Yash.."
            name="name"
            defaultValue={user.name}
          />
          <br />
          <label>User Email</label>
          <br />
          <input
            type="email"
            placeholder="user@example.com"
            name="email"
            defaultValue={user.email}
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
          <input type="date" name="dob" defaultValue={user.dobb} />
          <br />
          <label>Mobile number</label>
          <br />
          <input
            type="text"
            name="mobilenumber"
            defaultValue={user.mobilenumber}
          />
          <br />
          <button
            className={classes.editBtn}
            type="submit"
            name="intent"
            value={props.cookie}
          >
            Save
          </button>
          <NavLink to="/account-details">
            <button className={classes.editBtn}>back</button>
          </NavLink>
        </Form>
      </section>
    </>
  );
};
export default EditForm;

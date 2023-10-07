import classes from "./Edit_detailsPage.module.css";

const EditForm = (props) => {
  const nameInput = useSelector((state) => state.sliceOne.nameInput);
  const emailInput = useSelector((state) => state.sliceOne.emailInput);
  const mobilenumber = useSelector((state) => state.sliceOne.mobilenumber);
  const dob = useSelector((state) => state.sliceOne.dob);

  const formToggle = () => {
    props.clickfn();
  };

  return (
    <>
      <Form className={classes.form} method="PATCH">
        <label>User Name</label>
        <br />
        <input type="text" placeholder="Yash.." name="name" value={nameInput} />
        <br />
        <label>User Email</label>
        <br />
        <input
          type="email"
          placeholder="user@example.com"
          name="email"
          value={emailInput}
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
        <input type="date" name="dob" value={dob} />
        <br />
        <label>Mobile number</label>
        <br />
        <input type="text" name="mobilenumber" value={mobilenumber} />
        <br />
        <button
          className={classes.editBtn}
          type="submit"
          name="intent"
          value={props.cookie}
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
export default EditForm;

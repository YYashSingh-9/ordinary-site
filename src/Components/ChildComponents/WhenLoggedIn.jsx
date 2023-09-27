import classes from "./WhenLoggedIn.module.css";
import { Form } from "react-router-dom";
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
const EditForm = () => {
  return (
    <>
      <Form className={classes.form}>
        <label>User Name</label>
        <br />
        <input type="text" placeholder="Yash.." />
        <br />
        <label>User Email</label>
        <br />
        <input type="email" placeholder="user@example.com" />
        <br />
        <label>Gender</label>
        <select
          name="Select-Gender"
          className={classes.gender}
          defaultValue=""
          placeholder=""
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <br />
        <label>Date-of-Birth</label>
        <br />
        <input type="date" />
        <br />
        <label>Mobile number</label>
        <br />
        <input type="text" />
      </Form>
    </>
  );
};

const TableComponent = () => {
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
    </>
  );
};
const WhenLoggedIn = () => {
  return (
    <>
      <section className={classes.mainDiv}>
        <div className={classes.title}>
          <h2>Account</h2>
          <h3>Yash</h3>
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
            <EditForm />
            <button className={classes.editBtn}>save</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhenLoggedIn;

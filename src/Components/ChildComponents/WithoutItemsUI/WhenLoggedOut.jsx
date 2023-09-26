import classes from "./WhenLoggedOut.module.css";
import loginImage from "../../../assets/login-image.png";
import { Form } from "react-router-dom";
// Conditional Components...
const LoginForm = () => {
  return (
    <>
      <div className={classes.form}>
        <Form>
          <label>User Email</label>
          <br />
          <input type="email" placeholder="user@example.com" />
          <br />
          <label>User Password</label>
          <br />
          <input type="password" />
        </Form>
      </div>
    </>
  );
};
const SignupForm = () => {
  return (
    <>
      <div className={classes.form}>
        <Form>
          <label>User Name</label>
          <br />
          <input type="text" placeholder="Yash.." />
          <br />
          <label>User Email</label>
          <br />
          <input type="email" placeholder="user@example.com" />
          <br />
          <label>Initial Password</label>
          <br />
          <input type="password" />
          <br />
          <label>Confirm Password</label>
          <br />
          <input type="password" />
        </Form>
      </div>
    </>
  );
};
const WhenLoggedOut = (props) => {
  return (
    <>
      <div className={classes.parent}>
        <div className={classes.childOne}>
          <div className={classes.Img}>
            <img src={loginImage}></img>
          </div>
        </div>
        <div className={classes.childTwo}>
          <div className={classes.formDiv}>
            <div className={classes.Formtitle}>Login..</div>

            <SignupForm />
          </div>
          <button className={classes.signUpbtn}>
            Already a user? Signup then.
          </button>
        </div>
      </div>
    </>
  );
};

export default WhenLoggedOut;

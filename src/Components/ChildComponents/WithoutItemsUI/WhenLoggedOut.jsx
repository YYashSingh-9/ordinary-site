import classes from "./WhenLoggedOut.module.css";
import loginImage from "../../../assets/login-image.png";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../Store/StoreSlice";
// Conditional Components...
const LoginForm = () => {
  return (
    <>
      <div className={classes.form}>
        <Form method="POST" action="/account-details">
          <label htmlFor="emailInput">User Email</label>
          <br />
          <input
            type="email"
            placeholder="user@example.com"
            name="email"
            id="emailInput"
          />
          <br />
          <label htmlFor="passwordInput">User Password</label>
          <br />
          <input type="password" name="password" id="passwordInput" />
          <br />
          <button type="submit" name="intent" value="login">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};
const SignupForm = () => {
  return (
    <>
      <div className={classes.form}>
        <Form method="POST">
          <label htmlFor="name_input">User Name</label>
          <br />
          <input type="text" placeholder="Yash.." name="name" id="name_input" />
          <br />
          <label htmlFor="email_input">User Email</label>
          <br />
          <input
            type="email"
            placeholder="user@example.com"
            name="email"
            id="email_input"
          />
          <br />
          <label htmlFor="password_input">Initial Password</label>
          <br />
          <input type="password" name="password" id="password_input" />
          <br />
          <label htmlFor="cpassword_input">Confirm Password</label>
          <br />
          <input type="password" name="confirm password" id="cpassword_input" />
          <br />
          <button type="submit">Sign-up</button>
        </Form>
      </div>
    </>
  );
};
const WhenLoggedOut = (props) => {
  const signUpState = useSelector((state) => state.sliceOne.signUpFormState);
  const dispatch = useDispatch();

  const signupFormToggle = () => {
    dispatch(actions.signupFormToggler());
  };
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
            <div className={classes.Formtitle}>
              {signUpState ? "Signup" : "Login"}
            </div>
            {signUpState ? <SignupForm /> : <LoginForm />}
          </div>
          <button className={classes.signUpbtn} onClick={signupFormToggle}>
            {signUpState
              ? "Already signed up? Login then"
              : "Already a user? Signup then."}
          </button>
        </div>
      </div>
    </>
  );
};

export default WhenLoggedOut;

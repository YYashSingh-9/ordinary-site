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

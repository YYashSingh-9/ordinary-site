import classes from "./WhenLoggedOut.module.css";
import loginImage from "../../../assets/login-image.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../Store/StoreSlice";
import { useEffect } from "react";
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
          <button
            type="submit"
            name="intent"
            value="login"
            className={classes.formBtn}
          >
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
          <label htmlFor="mobile_number">Mobile Number</label>
          <br />
          <input type="number" name="mobilenumber" id="mobile_number" />
          <br />
          <label htmlFor="password_input">Initial Password</label>
          <br />
          <input type="password" name="password" id="password_input" />
          <br />
          <label htmlFor="cpassword_input">Confirm Password</label>
          <br />
          <input type="password" name="passwordConfirm" id="cpassword_input" />
          <br />
          <button
            type="submit"
            name="intent"
            value="signup"
            className={classes.formBtn}
          >
            Sign-up
          </button>
        </Form>
      </div>
    </>
  );
};
// THIS IS NOTIFICATION HELPER FUNCTION
const notifyFn = (type, text) => {
  if (type === "fail") {
    return toast.error(`${text}🙁`, {
      position: "top-right",
      theme: "light",
      autoClose: 2000,
    });
  }
};
const WhenLoggedOut = (props) => {
  const signUpState = useSelector((state) => state.sliceOne.signUpFormState);
  const dispatch = useDispatch();
  const actionData = useActionData();
  console.log(actionData);
  const signupFormToggle = async () => {
    dispatch(actions.signupFormToggler());
  };

  useEffect(() => {
    if (!actionData === undefined) {
      if (actionData.status === "fail") {
        notifyFn("fail", actionData.message);
      }
    }
  }, [actionData]);
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
        <ToastContainer />
      </div>
    </>
  );
};

export default WhenLoggedOut;

import classes from "./ContactUs.module.css";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../Store/StoreSlice";

// Re-usable component -> D.R.Y
const QueryTypeLink = (props) => {
  return (
    <>
      <span className={classes.queryLink}>
        <h4>{props.title}</h4>
        <AiOutlineRight />
      </span>
    </>
  );
};

const ContactUs = () => {
  const catalogueState = useSelector((state) => state.sliceOne.catalogueState);
  const dispatch = useDispatch();
  //THIS IS DONE TO REMOVE SUB MENU BECAUSE USER CLICKS THE SCREEN TO REMOVE POPUPS WHICH IS WE TARGET THIS DIV FOR THIS WORK
  const submenuRemover = () => {
    if (!catalogueState) {
      return;
    }
    dispatch(actions.CatalogueToggler("removeSubMenu"));
  };
  return (
    <>
      <section className={classes.mainDiv} onClick={submenuRemover}>
        <div className={classes.upperDiv}>
          <div className={classes.title}>
            <h2>help center</h2>
            <p>We are here to help you</p>
          </div>
          <div className={classes.trackTitle}>
            <BsFillBagCheckFill className={classes.bagLogo} />
            <div className={classes.texts}>
              <h3>track ,cancel ,return / exchange</h3>
              <p>Manage your purchases</p>
            </div>
            <button className={classes.checkOrderBtn}>Check order</button>
          </div>
        </div>
        <div className={classes.lowerDiv}>
          <div className={classes.queryTypesDiv_left}>
            <div className={classes.typesDiv}>
              <h3>select query type</h3>
              <QueryTypeLink title="Order related queries" />
              <QueryTypeLink title="Non-order related queries" />
              <QueryTypeLink title="Recent issue" />
            </div>
            <div className={classes.faqDiv}>
              <QueryTypeLink title="Frequently asked questions" />

              <h3>
                Want to reach us old style? Here is our{" "}
                <a
                  style={{
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  postal address.
                </a>
              </h3>
            </div>
          </div>
          <div className={classes.formDiv_right}>
            <Form method="post">
              <label>Please type your message here.</label>
              <br />
              <input type="text" name="message" />
              <br />
              <button>Send us</button>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;

import classes from "./ErrorDisplay.module.css";

const ErrorDisplay = (props) => {
  return (
    <>
      <section className={classes.mainError}>
        <div className={classes.centerInfo}>
          <div>
            <h3>
              {props.title
                ? props.title
                : "Oops Something went wrong.Click below "}
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorDisplay;

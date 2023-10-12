import classes from "./SmallSpinner.module.css";

export default function SmallSpinner() {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
}

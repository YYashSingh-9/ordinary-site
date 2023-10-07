const User = require("../Models/userModel");
const dotenv = require("dotenv");
const CatchAsync = require("../Util/CatchAsync");
const DefaultController = require("./DefaultController");
dotenv.config({ path: "./config.env" });

//FOLLOWED D.R.Y HERE..

// Helper function
const filterObj = (obj, ...allowedFields) => {
  console.log(obj, allowedFields);
  const newObject = {};
  Object.keys(obj).forEach((curr_el) => {
    if (allowedFields.includes(curr_el))
      return (newObject[curr_el] = obj[curr_el]);
  });
  return newObject;
};

// CREATING USER - SignUp functionality in authcontroller
// UPDATING EVERYTHING EXCEPT PASSWORD.. (<-this is in authcontroller)
exports.updateMe = CatchAsync(async (req, res, next) => {
  //1. If user tried updating password then return.
  if (req.body.password || req.body.passwordConfirm) {
    return new Error("Can't update this time..");
  }
  //2. Filtering unwanted fields ..
  const filteredObject = filterObj(
    req.body,
    "name",
    "email",
    "mobilenumber",
    "dob"
  );
  console.log(filteredObject);
  //3. Final update to account
  const doc = await User.findByIdAndUpdate(req.user.id, filteredObject, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return new Error("Failed to update User");
  }
  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

// THIS SETS PARAMS.ID TO USER.ID FROM PROTECT MIDDLEWARE
exports.Getme = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
// GET ONE USER.
exports.getOneUser = DefaultController.DefaultGetOne(User);
// GET ALL USERS.
exports.getAllUsers = DefaultController.DefaultReadAll(User);

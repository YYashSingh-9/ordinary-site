const User = require("../Models/userModel");

const filterObj = (obj, ...allowedFields) => {
  console.log(obj, allowedFields);
  const newObject = {};
  Object.keys(obj).forEach((curr_el) => {
    if (allowedFields.includes(curr_el))
      return (newObject[curr_el] = obj[curr_el]);
  });
  return newObject;
};
exports.createUser = async (req, res, next) => {
  try {
    const doc = await User.create(req.body);
    res.status(200).json({
      status: "Success",
      data: doc,
    });
    if (!doc) {
      return new Error("Failed to create User");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res, next) => {
  //1. If user tried updating password then return.
  if (req.body.password || req.body.passwordConfirm) {
    return new Error("Can't update this time..");
  }
  try {
    //2. Filtering unwanted fields ..
    const filteredObject = filterObj(req.body, "name", "email", "mobilenumber");
    console.log(filteredObject);
    //3. Final update to account
    const doc = await User.findByIdAndUpdate(req.params.id, filteredObject, {
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
  } catch (err) {
    console.log(err);
  }
  next();
};

const User = require("../Models/userModel");

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
  } catch (err) {}
};

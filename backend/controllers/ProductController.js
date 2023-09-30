const Product = require("../Models/productModel");
const AppError = require("../Util/appError");
const catchAsync = require("../Util/CatchAsync");

exports.getAllProducts = async (req, res, next) => {
  const doc = await Product.find();
  try {
    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.createNewProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.create(req.body);
  res.status(200).json({
    status: "Success",
    data: doc,
  });
  next();
});

exports.updateProduct = async (req, res, next) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("unable to update ", 401));
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

exports.getOneProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findById(req.params.id);
  // const doc = await Product.findOne({ slug: req.params.id });

  if (!doc) {
    return next(new AppError("unable to find product", 400));
  }
  res.status(200).json({
    status: "Success",
    data: doc,
  });
});

const Product = require("../Models/productModel");

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

exports.createNewProduct = async (req, res, next) => {
  const doc = await Product.create(req.body);
  res.status(200).json({
    status: "Success",
    data: doc,
  });
  next();
};

exports.updateProduct = async (req, res, next) => {
  try {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const doc = await Product.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

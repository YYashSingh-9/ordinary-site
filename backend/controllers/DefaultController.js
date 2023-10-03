const CatchAsync = require("../Util/CatchAsync");
const AppError = require("../Util/appError");

// Find One Document..
exports.DefaultGetOne = (model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await model.findById(req.params.id);
    // const doc = await Product.findOne({ slug: req.params.id });
    if (!doc) {
      return next(new AppError("unable to find product", 400));
    }
    res.status(200).json({
      status: "Success",
      data: doc,
    });
  });

// Updating One Document.
exports.DefaultUpdateOne = (model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
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
  });

// Creating a Document.
exports.DefaultCreateOne = (model) =>
  CatchAsync(async (req, res, next) => {
    const isBodyAnArray = Array.isArray(req.body);
    let doc;
    if (isBodyAnArray) {
      doc = await model.insertMany(req.body);
    } else if (!isBodyAnArray) {
      doc = await model.create(req.body);
    }
    console.log(isBodyAnArray);

    res.status(200).json({
      status: "Success",
      data: doc,
    });
  });

// Finding all the Documents.
exports.DefaultReadAll = (model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await model.find();
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

// Deleting a document
exports.DefaultDeleteOne = (model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

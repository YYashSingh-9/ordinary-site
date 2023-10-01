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
    try {
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
    } catch (err) {
      console.log(err);
    }
    next();
  });

// Creating a Document.
exports.DefaultCreateOne = (model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await model.create(req.body);
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

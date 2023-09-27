exports.getAllProducts = (req, res, next) => {
  console.log("this is working");
  try {
    res.status(200).json({
      status: "success",
    });
    next();
  } catch {}
};

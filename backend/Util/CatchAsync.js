module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      const errs = { ...err };
      console.log("✅✅✅💥💥💥", errs.properties, "💥💥💥💥");
      next(err);
    }); // this catch is callback runs when async task is rejected
  };
};

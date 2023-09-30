module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // console.log("💛💛", err);
      return next(err);
    }); // this catch is callback runs when async task is rejected
  };
};

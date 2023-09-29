exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err)); // this catch is callback runs when async task is rejected
  };
};

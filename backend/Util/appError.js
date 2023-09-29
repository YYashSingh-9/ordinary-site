class appError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = appError;
/*ye app error me hum error ko extend kar rahe hai aur class me aisa hota h ki jisko extend
krte hai uske variables hamare pass ajate hai yani child me jo ki hai yaha pe appError
toh ye jo apperror hai ye ab ek error ka child hai aur ab ye call hoga toh message jo
pass hoga vo direct parent me jayega message property me aur fir hum is error k sub class me
properties add kar kpass kardenge jo ki global error middleware me ajayega next(error )k karan
aur isme hume this.message ki property bhi mil jayegi kyuki vo super class k karan parent me
gayi fir waha se hum access karliye kyuki we are child*/

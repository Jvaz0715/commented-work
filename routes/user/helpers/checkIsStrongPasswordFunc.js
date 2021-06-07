const { checkIsStrongPassword } = require("../../utils/authMethods");

function checkIsStrongPasswordFunc(req, res, next) {
  //let errorObj = {};
  // we again have errorObj that spans our whole file and continues to collect any error messages to our res.locals. prior error messages will be present as well
  const { errorObj } = res.locals;

  // if (!checkIsStrongPassword(req.body.password)) {
  //   errorObj.weakPassword =
  //     "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  // }
  // if no errors, we move to the next function
  next();
}

module.exports = checkIsStrongPasswordFunc;
// we export the function for use in our userRouter.js
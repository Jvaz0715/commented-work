// we bring in functions created in the utils/authMethods.js file
const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");

// we check if email is valid
function checkIsEmailFunc(req, res, next) {
  // we again have errorObj that spans our whole file and continues to collect any error messages to our res.locals. prior error messages will be present as well
  const { errorObj } = res.locals;
  //if email is invalid, we add a errorObj
  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  // if email is valid, we use the next method to move on to any proceeding functions
  next();
}

// we check if first or last name are only letters with no special characters
function checkIsAlphaFunc(req, res, next) {
  // we again have errorObj that spans our whole file and continues to collect any error messages to our res.locals. prior error messages will be present as well
  const { errorObj } = res.locals;
  // incominData comes from the post
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        //if either names are invalid, we add a errorObj
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }
  
  // if names are valid, we use the next method to move on to any proceeding functions
  next();
}

// we check if username only has letters and numbers
function checkIsAlphanumericFunc(req, res, next) {
  // we again have errorObj that spans our whole file and continues to collect any error messages to our res.locals. prior error messages will be present as well
  const { errorObj } = res.locals;
  //if either username is invalid, we add a errorObj
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }

  // if username is valid, we use the next method to move on to any proceeding functions
  next();
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};

// we export the functions for use in our userRouter.js

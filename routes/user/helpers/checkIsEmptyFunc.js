const { checkIsEmpty } = require("../../utils/authMethods");

//this function checks any incoming data is empty if is empty send error message back
//else go to the next middleware function next()
function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;
  // we again have errorObj that spans our whole file and continues to collect any error messages to our res.locals. prior error messages will be present as well
  const { errorObj } = res.locals;

  //we use a loop to check if ANY of the keys are empty
  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {
      //if the key is empty, we continue to ass an error message
      errorObj[key] = `${key} cannot be empty`;
    }
  }
  // we check if errorobj has any data. if it does, it means we had an error and we respond with a failure message
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    // if no errors, we move to the next function
    next();
  }
}

module.exports = checkIsEmptyFunc;
// we export the function for use in our userRouter.js

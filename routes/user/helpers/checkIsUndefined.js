//first we check if object is undefined
function checkIsUndefined(req, res, next) {
  //if there are no keys in the object we return a message to the user to fill out the form
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Please fill out the form" });
  } else {
    let errorObj = {};
    // we establish or res.locals that will collect any error messages
    res.locals.errorObj = errorObj;
    // if no errors, we move to the next function
    next();
  }
}

module.exports = checkIsUndefined;
// we export the function for use in our userRouter.js
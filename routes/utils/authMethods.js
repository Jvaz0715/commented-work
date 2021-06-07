const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");

const checkIsEmpty = (target) => (isEmpty(target) ? true : false);

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;

const checkIsEmail = (email) => (isEmail(email) ? true : false);

const checkIsAlpha = (target) => (isAlpha(target) ? true : false);

const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};

/*

Here, we create some methods that we ecport for use in our helpers files.

We use arrow functions for cleaner code. 

Here, we use the validator module that make checking data easier rather than us writing out check formulas.


*/
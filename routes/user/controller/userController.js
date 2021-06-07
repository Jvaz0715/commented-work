const bcrypt = require("bcryptjs");
const User = require("../model/User");

const jwt = require("jsonwebtoken");

/*
Bcrypt is a module that hides user passwords and allows for the database to store passwords without the true password present.

User is brought in from the user schema file we created.

jwt is a module that allows for us to not have to put vulnerable data like api tokens, server names etc. directly into our code that would then be exposed when pushed to github
*/ 


// The following function is used to signup or make post requests
async function signup(req, res) {
  // the following object keys are brought in from what the user posts in the request body. We can use postman to test
  const { username, email, password, firstName, lastName } = req.body;

  // res.locals allows for us to continue to add any present errors to an error message. Prior, our function would simply stop and respond with only the first error it recieves. This allows for multiple error messages to be presented to the user
  const { errorObj } = res.locals;

  //below we use an if statement that simply checks if there are any error messages present in our created errorObj. If there are, we respond with a failure message.
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    /* below we start to use bcrpyt to encrypt the users password.
    hashedpassword will use the user password with our salt variable to complete this process. */ 
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    // using User from User.js we create the user
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    // we then add the created user to our database to be saved
    let savedUser = await createdUser.save();

    // respond success
    res.json({ message: "success", data: savedUser });
  } catch (e) {
    // if at any point we have an error in our 'try' the 'catch' will stop and respond with an error message.
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

// the below function is used to LOGIN a user if they are established in the database
async function login(req, res) {
  // the following object keys are brought in from what the user posts in the request body. We can use postman to test
  const { email, password } = req.body;

  // res.locals allows for us to continue to add any present errors to an error message. Prior, our function would simply stop and respond with only the first error it recieves. This allows for multiple error messages to be presented to the user
  const { errorObj } = res.locals;

  //below we use an if statement that simply checks if there are any error messages present in our created errorObj. If there are, we respond with a failure message.
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    // first we use the req.body email to see if the email exists in the database
    let foundUser = await User.findOne({ email: email });
    // if the email does not exist, we deliver a failure message. We could also use this spot to offer the user the chance to signup
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      // if the email DOES exist, we then move on to see if the password input matches the password saved in the database
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      //if the password does not match, we respond with a failure message
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        // using the jwt module, if the email and password match, we succuessfully login
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          // this is where we encode our key which can be found in the .env file
          process.env.PRIVATE_JWT_KEY,
          {
            // we put howl ong the jwt token is good for, this can be changed
            expiresIn: "1d",
          }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login };
// we export the functions for use in our userRouter.js
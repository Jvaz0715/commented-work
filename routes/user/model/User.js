const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);


/*User.js basically creates a 'template' of what each new user will have. Using mongoose, we establish they type of each key, and what it is. For example, 'unique' makes it so that there are no repeate usernames or emails*/ 
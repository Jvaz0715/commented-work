require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });


  /*
  As we have been doing for the past two weeks, we use mongoose to create our server.
  
  At line 10, we encrypt or network name using env, which we bring in from our dotenv module.

  
  */
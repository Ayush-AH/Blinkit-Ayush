const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB CONNCETED");
  })
  .catch((err) => {
    console.log(err.message);
  });

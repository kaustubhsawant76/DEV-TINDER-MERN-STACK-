const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kaustubh-node-database:761HsWCUAR0aQMS3@namastenodekbs.ybjgx.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

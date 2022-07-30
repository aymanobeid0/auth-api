const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // withour ref the array will contain the string object id
        // with the ref the array will contain the full document
        // so we can access the document and all its props
        ref: "Role",
      },
    ],
  })
);
module.exports = User;

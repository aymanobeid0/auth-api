const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./config/db.config");
const app = express();
const db = require("./models");
const Role = db.role;
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// to return the user token with a cookie session
app.use(
  cookieSession({
    name: "ayman-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    // httpOnly: indicate that the cookie is only to be sent over HTTP(S), and not made available to client JavaScript.
    httpOnly: true,
  })
);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  // check the document count if 0 then save the documents
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// const ayman = {
//   details: {
//     samer: "age20",
//     bilal: "age30",
//   },
//   details2: {
//     ahmed: "age20",
//     abass: "age30",
//   },
// };

// const { details } = ayman;
// console.log({ details });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("server is running");
});

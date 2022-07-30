const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model"); //user model USER
db.role = require("./role.model"); //role model ROLE
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

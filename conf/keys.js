const dotenv = require("dotenv");
dotenv.config();

const mongodbURI =
  "mongodb+srv://RKCADMIN:Runkkukunkku96@pervoeskocluster.omos6.mongodb.net/RKCDB?retryWrites=true&w=majority";

module.exports = mongodbURI;

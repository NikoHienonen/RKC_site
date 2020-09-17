const dotenv = require("dotenv");
dotenv.config();

const mongodbURI = process.env.MONGO_STRING;

module.exports = mongodbURI;

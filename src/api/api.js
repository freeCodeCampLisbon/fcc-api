const express = require("express");
var cors = require("cors");
const http = require("serverless-http");
const parser = require("body-parser");
const routes = require("../routes");
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));

// parse application/json
app.use(parser.json());

routes(app);
module.exports.handler = http(app);

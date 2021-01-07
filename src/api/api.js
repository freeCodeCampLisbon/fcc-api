const express = require("express");
const http = require("serverless-http");
const parser = require("body-parser");
const routes = require("../routes");
const app = express();

// parse application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: false }));

// parse application/json
app.use(parser.json());

routes(app);
module.exports.handler = http(app);

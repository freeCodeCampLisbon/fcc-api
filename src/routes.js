const express = require("express");
const router = express.Router();
const NameController = require("./controllers/NameController");

module.exports = function (app) {
  app.use("/.netlify/functions/api/name", NameController);

  router.get("/test", (req, res) => res.json("yooo"));

  app.use("/api", router);
};

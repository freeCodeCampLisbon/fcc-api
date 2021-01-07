const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
  res.json("test get");
});

router.get("/pretty", (req, res) => {
  res.json("your name is pretty");
});

module.exports = router;

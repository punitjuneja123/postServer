const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    var decoded = jwt.verify(token, process.env.key);
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.send("please enter valid token");
    }
  } else {
    res.send("please enter a token");
  }
}

module.exports = { authentication };

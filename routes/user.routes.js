const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../models/user.model");
let userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.send("welcome");
});

userRoute.post("/users/register", async (req, res) => {
  let { name, email, gender, password } = req.body;
  console.log(name, email, gender, password);
  bcrypt.hash(password, 8, async (err, result) => {
    if (err) {
      console.log(err);
      res.send("something went wrong while regestering");
    } else {
      let data = new userModel({ name, email, gender, password: result });
      await data.save();
      res.send("registered");
    }
  });
});

userRoute.post("/users/login", async (req, res) => {
  let { email, password } = req.body;
  let data = await userModel.find({ email });
  if (data.length > 0) {
    bcrypt.compare(password, data[0].password, (err, result) => {
      if (result) {
        let ID = data[0]._id;
        let token = jwt.sign({ userID: ID }, process.env.key);
        res.send({ mag: "login successful", token: token });
      } else {
        res.status(400);
        res.send("wrong password");
      }
    });
  } else {
    res.status(400);
    res.send("wrong credentials");
  }
});

module.exports = { userRoute };

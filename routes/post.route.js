const express = require("express");
const { postModel } = require("../models/post.model");
let postRoute = express.Router();

postRoute.get("/posts", async (req, res) => {
  let req_userID = req.body.userID;
  let data = await postModel.find({ userID: req_userID });
  res.send(data);
});

postRoute.post("/posts/create", async (req, res) => {
  let payload = req.body;
  try {
    let data = new postModel(payload);
    await data.save();
    res.send("post created");
  } catch (error) {
    console.log(error);
    res.send("somthing went wrong while posting");
  }
});

postRoute.patch("/posts/update/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  try {
    let data = await postModel.findByIdAndUpdate({ _id: ID }, payload);
    console.log(data);
    res.send("updated");
  } catch (error) {
    console.log(error);
    res.send("something went wrong while updating");
  }
});

postRoute.delete("/posts/delete/:id", async (req, res) => {
  let ID = req.params.id;
  try {
    let data = await postModel.findByIdAndDelete({ _id: ID });
    console.log(data);
    res.send("Deleted");
  } catch (error) {
    console.log(error);
    res.send("something went wrong while deleting");
  }
});

module.exports = { postRoute };

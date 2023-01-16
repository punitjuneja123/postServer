const express = require("express");
const { postModel } = require("../models/post.model");
let postRoute = express.Router();

postRoute.get("/posts?:device", async (req, res) => {
  let req_userID = req.body.userID;
  let device1 = req.query.divice1;
  let device2 = req.query.device2;
  console.log(req.query);
  console.log(device1, device2);
  if (device2 == undefined) {
    let data = await postModel.find({ userID: req_userID, device: device1 });
    res.send(data);
  } else {
    let data = await postModel.find({
      $and: [{ userID: req_userID, device: device1, device: device2 }],
    });
    res.send(data);
  }

  //   let data = await postModel.find({ userID: req_userID });
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

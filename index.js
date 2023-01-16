const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { postRoute } = require("./routes/post.route");
const { authentication } = require("./middleware/auth.middleware");

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(authentication);
app.use(postRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server started");
});

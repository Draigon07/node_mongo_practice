const express = require("express");
const morgan = require("morgan");
const connect = require("./connect");
const router = require("./routes/router");
const { json, urlencoded } = require("body-parser");
const app = express();
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/", router);
connect("mongodb://localhost:27017/api")
  .then(() => {
    app.listen(5000, () => {
      console.log("server up on port 5000");
    });
  })
  .catch((e) => console.error(e));

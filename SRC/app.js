import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hola" });
});

app.listen(4000, () => {
  console.log(Hola);
});

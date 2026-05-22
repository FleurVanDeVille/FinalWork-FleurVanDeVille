const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend werkt!");
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server draait op poort ${PORT}`);
});
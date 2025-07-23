const express = require("express");
const cors = require("cors");

const app = express();
const db = {};

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { key, ip, port } = req.body;
  db[key] = { ip, port };
  res.send("Registered");
});

app.get("/resolve/:key", (req, res) => {
  const entry = db[req.params.key];
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).send("Not found");
  }
});

// 👇 This is what fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Relay server is up and running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Relay server running on port ${PORT}`));

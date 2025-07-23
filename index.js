const express = require("express");
const cors = require("cors");

const app = express();
const db = {};

app.use(cors());
app.use(express.json());

// Register client with key, IP and port
app.post("/register", (req, res) => {
  const { key, ip, port } = req.body;
  db[key] = { ip, port };
  res.send("Registered");
});

// Resolve key to IP and port
app.get("/resolve/:key", (req, res) => {
  const entry = db[req.params.key];
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).send("Not found");
  }
});

// Home route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Relay server is up and running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Relay server running on port ${PORT}`));

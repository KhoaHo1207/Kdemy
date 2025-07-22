const express = require("express");
const cors = require("cors");
const DBConnect = require("./config/DBConnect");
require("dotenv").config();
const clerkWebhooks = require("./controllers/webhooks");
const app = express();

const PORT = process.env.PORT || 8080;
//Connect DB
DBConnect();

//Middlewares
app.use(cors());

//Routes
app.post("/clerk", express.json(), clerkWebhooks);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

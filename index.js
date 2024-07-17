const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const registeration = require("./routes/registeration.js"); // Ensure correct path
const allusers = require("./routes/allusers.js");
const addproduct = require("./routes/addproduct.js");
const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/api", (req, res) => {
  res.status(200).send("You Are Connected To Server");
});
app.get("/", (req, res) => {
  res.status(200).send("You Are Connected To Server");
});

app.use("/images", express.static(path.join(__dirname, "./images")));
app.use("/", registeration); // Mounting the route correctly
app.use("/", allusers);
app.use("/", addproduct);
// Connect to MongoDB and start server
mongoose
  .connect(
    "mongodb+srv://mostafawaseem:tomato11.@tomatoc1.61qflzv.mongodb.net/?retryWrites=true&w=majority&appName=tomatoc1"
  )
  .then(() => {
    console.log("<==$ DataBase Connected $==>");
  })
  .then(() => {
    app.listen(port, () => {
      console.log("===> Application Is Running On Port: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

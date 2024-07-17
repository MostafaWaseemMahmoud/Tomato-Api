import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import def from "./routes/def.js"; // Import your routes
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors()); // Add parentheses to call the function
app.use(bodyParser.json()); // Add .json() to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add .urlencoded() for URL-encoded data

// Use your routes
app.use("/", def); // Specify the base path for your routes

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
    console.lof(err);
  });

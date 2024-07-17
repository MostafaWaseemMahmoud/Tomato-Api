const Router = require("express");

const route = Router();

route.get("/api", (req, res) => {
  res.status(200).send("You Are Connected To Server");
});

export default route;

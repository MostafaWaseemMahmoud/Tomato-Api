import { Router } from "express";

const route = Router();

route.get("/", (req, res) => {
  res.status(200).send("You Are Connected To Server");
});

export default route;

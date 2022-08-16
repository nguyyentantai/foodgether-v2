import express from "express";

const menuRouter = express.Router();

menuRouter.post("/", (req, res) => {
  return res.send("Hello World");
});

export default menuRouter;

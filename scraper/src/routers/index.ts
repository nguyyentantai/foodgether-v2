import express from "express";
import menuRouter from "./menu";

const router = express.Router();

router.use("/menu", menuRouter);
router.get("/", (req, res) => {
  return res.send("Hello World");
});

export default router;

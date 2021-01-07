import express from "express";
const router = express.Router();

router.get("/", (_req: any, res: any) => {
  res.json("test get");
});

router.get("/pretty", (req: any, res: any) => {
  res.json("your name is pretty");
});

export default router

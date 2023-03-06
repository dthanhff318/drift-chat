import express from "express";
import { authRoute } from "./authRoute";

const router = express.Router();

router.use("/auth", authRoute);

export const apiV1 = router;

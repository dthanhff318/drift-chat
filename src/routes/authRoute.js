import express from "express";
import { io } from "~/server";
const router = express.Router();

router.post("/test", (req, res) => {
  io.emit("message", req.body.value);
  console.log("siu");
  res.send("Data retrieved successfully");
});

// router.post("/login", authController.loginUser);
// router.post("/refresh", authController.requestRefreshToken);
// router.post("/logout", authController.logoutUser);
// router.post("/check", verifyToken, authController.checkToken);

export const authRoute = router;

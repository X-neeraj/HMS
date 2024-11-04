import express from "express";
const { createUser,loginUser,getBookingByUserId } = require("../controller/User")
const { authMiddleware } = require("../middleware/jwtAuthMiddleware")
const router =express.Router();

router.post("/register",createUser)
.post("/logIn",loginUser)
.get("/book",authMiddleware,getBookingByUserId)

exports.router = router;
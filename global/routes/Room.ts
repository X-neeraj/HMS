import express from "express";
const { authMiddleware } = require("../middleware/jwtAuthMiddleware")
const { createRoom,getRooms,getRoomById } = require("../controller/Room")
const router =express.Router();

router.post("/",authMiddleware,createRoom)
.get("/",getRooms)
.get("/:id",getRoomById)

exports.router = router;
import express from "express";
const router = express.Router();
const { createBooking,getAllBookings,getBookingByUserId,deallocateRoom } = require("../controller/Booking")

router.post("/",createBooking)
.get("/",getAllBookings)
.get("/:userId",getBookingByUserId)
.get("/deallocate/:roomId",deallocateRoom)

exports.router=router;
import { NextFunction, Response } from "express";
import { authRequest } from "../utils/common";
import bookService from "../services/book.service";


exports.createBooking = async (req:authRequest,res:Response,next:NextFunction) => {
    try{
        // const { roomId, startDateString, endDateString, guests } = req.body;
        // const roomInfo=await roomDAO.getRoomById(roomId);
        // // const room = await Room.findById(roomId).exec();
        // if(!roomInfo){
        //     return res.status(404).json({ message:"room does not exist" })
        // }
        // const room=new roomDTO(roomInfo)

        // if(room.roomAvailability===true){
        //     await roomDAO.allocateRoom(roomId);
        //     // room.roomAvailability=false;
        //     // await room.save();
        // }else{
        //     return res.status(404).json({ message:"room is not available" })
        // }

        // const startDate = new Date(startDateString);
        // const endDate = new Date(endDateString);
        // const numberOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        // const totalPrice = room.roomPrice * numberOfDays;

        // const book=await bookingDAO.createBooking({ 
        //     userId:req.user._id,
        //     roomId,
        //     startDate:startDateString,
        //     endDate:endDateString,
        //     guests,
        //     totalPrice,
        // })
        // const doc= new bookingDTO(book);
        // const book = new Booking({ 
        //     userId:req.user._id,
        //     roomId,
        //     startDate:startDateString,
        //     endDate:endDateString,
        //     guests,
        //     totalPrice,
        // })

        // const doc = await book.save();
        const doc=await bookService.bookRoom(req.body,req.user._id)
        res.status(200).json(doc);

    }catch(err){
        next(err)
        // res.status(500).json({ message:"something went wrong",err })
    }
}

exports.getAllBookings = async (req:authRequest,res:Response,next:NextFunction) => {
    try{
        // if(req.user.owner===true){
        //     const book=await bookingDAO.getAllBooking();
        //     const log=book.map(book => new bookingDTO(book));
        //     // const log = await Booking.find({}).populate({
        //     //     path:'userId',
        //     //     select:'name email'
        //     // }).populate({
        //     //     path:'roomId',
        //     //     select:'roomNo roomType'
        //     // }).exec()
        //     res.status(200).json(log)
        // }else{
        //     res.status(401).json({message:"unauthorized"})
        // }
        const log=await bookService.getBookings(req.user);
        res.status(200).json(log)
    }catch(err){
        next(err)
        // res.status(500).json({message:"something went wrong",err})
    }
}

exports.getBookingByUserId = async( req:authRequest,res:Response,next:NextFunction ) => {
    try{
        // const id =req.params.userId
        // const book=await bookingDAO.getBookById(id);
        // if(!book){
        //     return res.status(404).json({ message: 'Wrong Booking Id' });
        // }
        // const log=new bookingDTO(book);
        // // const log = await Booking.findById(id).populate({
        // //     path:'userId',
        // //     select:'name email'
        // // }).populate({
        // //     path:'roomId',
        // //     select:'roomNo roomType'
        // // }).exec();
        const log=await bookService.getBooking(req.params.userId)
        res.status(200).json(log)
    }catch(err){
        next(err)
    }
}

exports.deallocateRoom = async( req:authRequest,res:Response,next:NextFunction ) => {
    try{
        // if(req.user.owner){
        //     const id=req.params.roomId
        //     // const room=await Room.findById(id).exec();
        //     const roomInfo=await roomDAO.getRoomById(id);
        //     if(!roomInfo){
        //         return res.status(404).json({ message:"room does not exist" })
        //     }
        //     const room=new roomDTO(roomInfo)
            
        //     if(room.roomAvailability===false){
        //         await roomDAO.deallocateRoom(id);
        //         // room.roomAvailability=true;
        //         // await room.save();
        //         return res.status(200).json({message:"room is sucessfully deallocated"})
        //     }else{
        //         return res.status(404).json({ message:"room is already available" })
        //     }
            
        // }else{
        //     res.status(401).json({message:"you do not have the acess"})
        // }
        const log=await bookService.emptyRoom(req.user,req.params.roomId);
        return res.status(200).json(log)
    }catch(err){
        next(err)
    }
}

exports.confirmBooking = async( req:authRequest,res:Response,next:NextFunction ) => {
    try{

        // const id=req.params.roomId
        // if(req.user.owner===true){
        //     const book=await bookingDAO.confirmBooking(id)
        //     res.status(201).json(book)
        // }else{
        //     res.status(401).json({message:"you do not have access"})
        // }
        const book=await bookService.confirmBook(req.params.roomId,req.user)
        res.status(201).json(book)
    }catch(err){
        next(err)
    }
}
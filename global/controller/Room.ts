// import roomDAO from "../dao/roomDAO";
// import { roomDTO } from "../dto/roomDTO";
// import Room from "../model/Room";
import { NextFunction, Request,Response } from "express";
import roomService from "../services/room.service";
import appError from "../errors/appError";

interface authRequest extends Request {
    user?: any
}

exports.createRoom = async (req:authRequest,res:Response,next:NextFunction)=>{
    try{
        const newRoom=await roomService.roomCreate(req.user.owner,req.body);
            // const newRoom=await roomDAO.createRoom(req.body);
            // const room=new roomDTO(newRoom);
            // const room=new Room({...req.body});
            // const doc=await room.save();
        res.status(201).json(newRoom);
    }catch(err){
        next(err);
        // res.status(500).json(err)      
    }
}

exports.getRooms = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        // const room= await roomDAO.getAllRooms();
        // // const rooms=await Room.find({}).exec();
        // const allRoomInfo = room.map(room => new roomDTO(room)); 
        const roomInfo=await roomService.allRoomsInfo();
        res.status(200).json(roomInfo)
    }catch(err){
        next(new appError("not allowed",403));
        // res.status(500).json(err)
    }
}

exports.getRoomById = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const roomId = req.params.id;
        // const info = await roomDAO.getRoomById(roomId)
        // if(!info){
        //     return res.status(404).json({ message: 'Room not found' });
        // }
        // // const room = await Room.findById(roomId).exec();
        // const room=new roomDTO(info)
        const room=await roomService.roomDetail(roomId);
        res.status(200).json(room);
    }catch(err){
        next(err);
        // res.status(500).json(err)
    }
}
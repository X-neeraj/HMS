// import User from "../model/User"
import { NextFunction, Request,Response } from "express"
import bcrypt from 'bcryptjs';
import { generateJwtToken,authRequest } from "../utils/common";
import Booking from "../model/Booking";
import userDAO from "../dao/userDAO";
import { userDTO } from "../dto/userDTO";
import userService from "../services/user.service";

exports.createUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user= await userService.newUser(req.body);
        res.status(201).json(user);
    }catch(err){
        next(err);
    }
}

exports.loginUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const user= await userService.loginUser(req.body.email,req.body.password)
        res.status(200).json(user);
    }catch(err){
        next(err);
        // res.status(500).json(err);
    }
}

exports.getBookingByUserId = async( req:authRequest,res:Response,next:NextFunction ) => {
    
    try{
        const log = await Booking.find({userId: req.user._id}).exec();
        res.status(200).json(log)
    }catch(err){
        next(err)
        // res.status(500).json({message:"something went wrong",err})
    }
}


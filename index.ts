import express,{Request,Response} from "express";
import connectDB from "./global/database/db";
const config =require("./config")
const server=express();
const roomRouter = require("./global/routes/Room");
const userRouter = require("./global/routes/User");
const bookingRouter = require("./global/routes/Booking")
const { authMiddleware } = require("./global/middleware/jwtAuthMiddleware")
const {errorHandler} = require("./global/middleware/errorMiddleware")

server.use(express.json())

if(config.enviornment!=="test"){
    connectDB();
}


server.use('/room',roomRouter.router);
server.use('/user',userRouter.router);
server.use('/book',authMiddleware,bookingRouter.router);
server.use("*",(req:Request,res:Response)=>{
    res.json({"hello":"hello"})
})

server.use(errorHandler)

if(config.enviornment!=="test"){
    server.listen(config.port,()=>{
        console.log(`connected to ${config.port}`)
    })    
}

export default server;

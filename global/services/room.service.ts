import roomDAO from "../dao/roomDAO";
import { roomDTO } from "../dto/roomDTO";
import appError from "../errors/appError";
import { roomInterface } from "../model/Room";

class roomService {
    async roomCreate(owner:Boolean,roomInfo:roomInterface){
        if(owner===true){
            const newRoom=await roomDAO.createRoom(roomInfo);
            return new roomDTO(newRoom);
        }else{
            throw new appError("not allowed",403);
        }
    }

    async allRoomsInfo(){
        const room= await roomDAO.getAllRooms();
        const allRoomInfo = room.map(room => new roomDTO(room)); 
        return allRoomInfo;
    }

    async roomDetail(roomId:string){
        const info = await roomDAO.getRoomById(roomId)
        if(!info){
            throw new appError("Room not found",404);
        }
        return new roomDTO(info)
    }
}

export default new roomService();
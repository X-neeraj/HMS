import Room,{roomInterface} from "../model/Room";

class roomDAO{
    async createRoom(roomData:roomInterface){
        const room =new Room(roomData)
        return await room.save(); 
    }
    async getAllRooms(){
        return await Room.find({}).exec();
    }
    async getRoomById(roomId:string){
        return await Room.findById(roomId).exec();
    }
    async allocateRoom(roomId:string){
        const room = await Room.findById(roomId).exec();
        if(room){
            room.roomAvailability=false;
            return await room.save();
        }
    }
    async deallocateRoom(roomId:string){
        const room = await Room.findById(roomId).exec();
        if(room){
            room.roomAvailability=true;
            return await room.save();
        }
    }
    
}

export  default new roomDAO();
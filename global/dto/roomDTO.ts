import { roomInterface } from "../model/Room";

export class roomDTO{
    roomId:string;
    roomNo:string;
    roomType:string;
    roomPrice:number;
    roomAvailability:boolean;

    constructor(room:roomInterface){
        this.roomId=room._id.toString();
        this.roomNo=room.roomNo;
        this.roomType=room.roomType;
        this.roomPrice=room.roomPrice;
        this.roomAvailability=room.roomAvailability
    }
}
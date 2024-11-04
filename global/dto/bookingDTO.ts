import { bookInterface,guestInterface } from "../model/Booking";

export class bookingDTO {
    userId: string; 
    roomId: string;
    startDate: Date;
    endDate: Date; 
    totalPrice: number; 
    status: string; 
    guests: guestInterface[]; 
    constructor(bookInfo:bookInterface){
        this.userId=bookInfo.userId.toString();
        this.roomId=bookInfo.roomId.toString();
        this.startDate=bookInfo.startDate;
        this.endDate=bookInfo.endDate;
        this.totalPrice=bookInfo.totalPrice;
        this.status=bookInfo.status;
        this.guests=bookInfo.guests;
    }
}
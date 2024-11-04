import bookingDAO from "../dao/bookingDAO";
import roomDAO from "../dao/roomDAO";
import { bookingDTO } from "../dto/bookingDTO";
import { roomDTO } from "../dto/roomDTO";
import appError from "../errors/appError";

class bookService{
    async bookRoom(roomInfo:any,userId:string){
        const { roomId, startDateString, endDateString, guests } = roomInfo;
        const roomData=await roomDAO.getRoomById(roomId);
        if(!roomData){
            throw new appError("room not found",404)
        }
        const room=new roomDTO(roomData)

        if(room.roomAvailability){
            await roomDAO.allocateRoom(roomId);
        }else{
            throw new appError("room is not available",404)
        }

        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const numberOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        const totalPrice = room.roomPrice * numberOfDays;

        const book=await bookingDAO.createBooking({ 
            userId:userId,
            roomId,
            startDate:startDateString,
            endDate:endDateString,
            guests,
            totalPrice,
        })
        return new bookingDTO(book);
    }
    async getBookings(userInfo:any){
        if(userInfo.owner===true){
            const book=await bookingDAO.getAllBooking();
            const log=book.map(book => new bookingDTO(book));
            return log;
        }else{
            throw new appError("unauthorized",401)
        }
    }
    async getBooking(bookId:string){
        const book=await bookingDAO.getBookById(bookId);
        if(!book){
            throw new appError("Wrong Booking Id",404)
            // throw new Error ('Wrong Booking Id')
        }
        return book.map(book => new bookingDTO(book));
    }
    async emptyRoom(userInfo:any,roomId:string){
        if(userInfo.owner){
            const roomInfo=await roomDAO.getRoomById(roomId);
            if(!roomInfo){
                throw new appError("room does not exist",404)
            }
            const room=new roomDTO(roomInfo)         
            if(room.roomAvailability===false){
                await roomDAO.deallocateRoom(roomId);
                return {message:"room is sucessfully deallocated"}
            }else{
                throw new appError("room is already available",404)
            }
        }else{
            throw new appError("you do not have the acess",401)
        }
    }
    async confirmBook(roomId:String,userInfo:any){
        if(userInfo.owner===true){
            const book=await bookingDAO.confirmBooking(roomId)
            return book;
        }else{
           throw new appError("you do not have access",401)
        }
    }
}

export default new bookService();
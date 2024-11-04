import Booking from "../model/Booking";

class bookingDAO {
    async createBooking(bookData:object){
        const newBook =new Booking(bookData);
        return await newBook.save();
    } 
    async getAllBooking(){
        return await Booking.find({}).exec();
    }
    async getBookById(userId:string){
        return await Booking.find({userId}).exec();
    }
    async confirmBooking(bookId:String){
        const book=await Booking.findById(bookId);
        if(book){
            book.status="confirmed"; 
            return await book.save();
        }else{
            return {message:"no such booking"}
        } 
    }  
    
}  

export default new bookingDAO();
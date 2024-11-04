import mongoose,{Schema,Model,Document} from "mongoose";
import { userInterface } from "./User";
import { roomInterface } from "./Room";

export interface guestInterface {
    name: string;
    age: number;
    number: string;
}

export interface bookInterface extends Document {
  userId: mongoose.ObjectId | userInterface; 
  roomId: mongoose.ObjectId | roomInterface;
  startDate: Date;
  endDate: Date; 
  totalPrice: number; 
  status: 'confirmed' | 'pending' | 'canceled'; 
  guests: guestInterface[]; 
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema: Schema<bookInterface> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true }, 
  endDate: { type: Date, required: true }, 
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'canceled'],
    default: 'pending',
  },
  guests: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      number: { type: String, required: true },
    },
  ],
  }, 
  { timestamps: true }
);
  
const Booking: Model<bookInterface> = mongoose.model<bookInterface>('Booking', bookingSchema);
export default Booking;
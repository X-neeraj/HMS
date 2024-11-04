import mongoose, { Document, Schema, Model, Mongoose } from 'mongoose';

export interface roomInterface extends Document {
  _id:mongoose.ObjectId;
  roomNo: string;
  roomType: string;
  roomPrice: number;
  roomAvailability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema: Schema = new Schema({
    roomNo: { type: String, required: true, unique:true },
    roomType: { type: String, required: true, enum: ["single", "double", "suite", "deluxe"] },
    roomPrice: { type: Number, required: true },
    roomAvailability: { type: Boolean, default: true },
  },
  { timestamps: true });

const Room: Model<roomInterface> = mongoose.model<roomInterface>('Room', roomSchema);

export default Room;

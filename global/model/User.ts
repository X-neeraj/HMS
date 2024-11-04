import mongoose, { Document, Schema, Model, Types } from 'mongoose';


export interface userInterface extends Document {
  _id:Types.ObjectId
  name: string;
  email: string;
  age:number
  password:string
  phoneNumber: string;
  owner:boolean
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema<userInterface> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type:String,required:true},
    age: { type: Number, required: true },
    owner : {type: Boolean, default:false},
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<userInterface> = mongoose.model<userInterface>('User', UserSchema);

export default User;

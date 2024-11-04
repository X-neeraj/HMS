import { generateJwtToken } from "../utils/common";
import userDAO from "../dao/userDAO"
import { userDTO } from "../dto/userDTO"
import appError from "../errors/appError";
import { userInterface } from "../model/User";
import bcrypt from 'bcryptjs';

class userService {
    async newUser(userInfo:userInterface){
        const userToCreate:any = { ...userInfo };
        const salt = await bcrypt.genSalt(10);
        userToCreate.password = await bcrypt.hash(userToCreate.password, salt);
        const newUser=await userDAO.createUser(userToCreate)
        // const user= new User({...req.body});
        // const doc=await user.save();
        const token = generateJwtToken(newUser.owner,newUser._id);
        const user=new userDTO(newUser)
        return {token,user};
    }

    async loginUser(email: string, password: string) {
        // const user=await User.findOne({email:req.body.email}).exec();
        const user = await userDAO.findUserByEmail(email);
        if (!user) {
            throw new appError("User not found",401);
            // throw new Error("User not found");
        }
        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new appError("Invalid credentials",404);
        }
        const userInfo = new userDTO(user);
        const token = await generateJwtToken(user.owner, user._id);
        return { userInfo, token };
    }

    async comparePassword(enteredPassword: string, savedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, savedPassword);
    }
}

export default new userService();
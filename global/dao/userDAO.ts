import User,{userInterface} from "../model/User";

class UserDAO {
    async createUser(userData:userInterface){
        const user=new User(userData);
        return await user.save()
    }

    async findUserByEmail(email:string){
        return await User.findOne({email}).exec();
    }
}

export default new UserDAO()
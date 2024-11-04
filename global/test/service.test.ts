import bcrypt from 'bcryptjs';
import userService from "../services/user.service";
import bookService from "../services/book.service";
import userDAO from "../dao/userDAO";
import roomDAO from "../dao/roomDAO";
import { generateJwtToken } from "../utils/common";

import {userDTO} from "../dto/userDTO";
import { userInterface } from '../model/User';
import { roomDTO } from '../dto/roomDTO';
import { bookingDTO } from '../dto/bookingDTO';
import bookingDAO from '../dao/bookingDAO';
import appError from '../errors/appError';

jest.mock('bcryptjs');
jest.mock("../dao/userDAO");
jest.mock("../utils/common");
jest.mock("../dao/roomDao");
jest.mock("../dao/bookingDAO");
jest.mock("../dto/roomDTO");
jest.mock("../dto/bookingDTO");


describe("User Service - Unit Testing",()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    it('should create user', async()=>{
        // arrange
        const user:any={
            name:"admin",
            email:"admin@gmail.com",
            password:"admin123",
            age:22,
            owner:true,
            phoneNumber:"123456789",
        };
        const hashedPassword="hashedPassword"
        const createdUser = { ...user, password: hashedPassword,_id:"12345",} as userInterface;
        const jwtToken = "jwt_token";

        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        (userDAO.createUser as jest.Mock).mockResolvedValue(createdUser);
        (generateJwtToken as jest.Mock).mockReturnValue(jwtToken);

        // Act
        const result = await userService.newUser(user);

        // Assert
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 'salt');
        expect(userDAO.createUser).toHaveBeenCalledWith({
            ...user,
            password: hashedPassword
        });
        expect(generateJwtToken).toHaveBeenCalledWith(createdUser.owner, createdUser._id);
        expect(result).toEqual({
            token: jwtToken,
            user: new userDTO(createdUser)
        });
    })

    it('should allow user to login',async ()=>{
        const user:any={
            _id:"12345",
            name:"admin",
            email:"admin@gmail.com",
            password:"hashedPassword",
            age:22,
            owner:true,
            phoneNumber:"123456789",
        };
        const jwtToken = "jwt_token";
        const password:string="admin123";

        // (userService.comparePassword as jest.Mock).mockResolvedValue(true);
        // mocking the instance with spyon means we are mocking the instance of object
        // not whole module
        jest.spyOn(userService, 'comparePassword').mockResolvedValue(true);
        (generateJwtToken as jest.Mock).mockResolvedValue(jwtToken);
        (userDAO.findUserByEmail as jest.Mock).mockResolvedValue(user);

        const userInfo=await userService.loginUser('admin@gmail.com',password);

        expect(userService.comparePassword).toHaveBeenLastCalledWith(password,user.password);
        expect(generateJwtToken).toHaveBeenCalledWith(user.owner, user._id);
        expect(userInfo).toEqual({
            token: jwtToken,
            userInfo: new userDTO(user)
        });
    })

    it('should throw an error if user not found', async () => {
        // Arrange
        const email = "notfound@gmail.com";
        const password = "admin123";

        jest.spyOn(userDAO, 'findUserByEmail').mockResolvedValue(null);

        // Act & Assert
        // await expect(userService.loginUser(email, password)).rejects.toThrow(appError);
        await expect(userService.loginUser(email, password)).rejects.toThrow("User not found");
        expect(userDAO.findUserByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw an error if password is invalid', async () => {
        // Arrange
        const user:any = {
            _id: "12345",
            name: "admin",
            email: "admin@gmail.com",
            password: "hashedPassword",
            owner: true,
        };
        const password = "wrongpassword";

        jest.spyOn(userDAO, 'findUserByEmail').mockResolvedValue(user);
        jest.spyOn(userService, 'comparePassword').mockResolvedValue(false);

        // Act & Assert
        await expect(userService.loginUser(user.email, password)).rejects.toThrow("Invalid credentials");
        expect(userDAO.findUserByEmail).toHaveBeenCalledWith(user.email);
        expect(userService.comparePassword).toHaveBeenCalledWith(password, user.password);
    });
})

describe("Book Service - Unit Testing",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it('should book room - Unit Testing',async ()=>{
        const roomInfo = {
            roomId: 'room1',
            startDateString: '2024-10-01',
            endDateString: '2024-10-05',
            guests: 2
        };
        const userId = 'user1';
        const mockRoomData = { roomAvailability: true, roomPrice: 100 };
        const mockBookingData = {
            userId,
            roomId: roomInfo.roomId,
            startDate: roomInfo.startDateString,
            endDate: roomInfo.endDateString,
            guests: roomInfo.guests,
            totalPrice: 400
        };
        (roomDAO.getRoomById as jest.Mock).mockResolvedValue(mockRoomData);
        (roomDAO.allocateRoom as jest.Mock).mockResolvedValue(true);
        // changing the implementation of constructor
        // if we are using jest.mock first we have to mock the module there is one more way of jest.mock which is factory version jest.fn()
        // if we want to do it directly we can use jest.spyon
        (roomDTO as jest.Mock).mockImplementation(() => mockRoomData);
        (bookingDTO as jest.Mock).mockImplementation(() => mockBookingData);

        const result= await bookService.bookRoom(roomInfo,userId);
        expect(roomDAO.getRoomById).toHaveBeenCalledWith(roomInfo.roomId);
        expect(roomDAO.allocateRoom).toHaveBeenCalledWith(roomInfo.roomId);
        expect(bookingDAO.createBooking).toHaveBeenCalledWith({
            userId,
            roomId: roomInfo.roomId,
            startDate: roomInfo.startDateString,
            endDate: roomInfo.endDateString,
            guests: roomInfo.guests,
            totalPrice: 400
        });
        expect(result).toEqual(mockBookingData);

    })

    it('should throw an error if room is not found', async () => {
        const roomInfo = {
            roomId: 'room1',
            startDateString: '2024-10-01',
            endDateString: '2024-10-05',
            guests: 2
        };
        const userId = 'user1';
        (roomDAO.getRoomById as jest.Mock).mockResolvedValue(null);

        await expect(bookService.bookRoom(roomInfo, userId)).rejects.toThrow(new appError('room not found', 404));
        expect(roomDAO.getRoomById).toHaveBeenCalledWith(roomInfo.roomId);
    });
})